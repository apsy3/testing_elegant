'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem {
  id: string;
  handle: string;
  title: string;
  image: string | null;
  price: number;
  currencyCode: string;
  variantId?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredItems(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem('luxury-cart');
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { items?: CartItem[] };
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredItems());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      'luxury-cart',
      JSON.stringify({ items })
    );
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }
      return [...current, { ...item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, quantity } : entry))
    );
  }, [removeItem]);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((value) => !value), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      openCart,
      closeCart,
      toggleCart
    }),
    [items, isOpen, addItem, removeItem, updateQuantity, clear, openCart, closeCart, toggleCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartStore must be used within a CartProvider');
  }
  return context;
}

export function useCartStore<T>(selector: (state: CartContextValue) => T): T;
export function useCartStore(): CartContextValue;
export function useCartStore<T>(selector?: (state: CartContextValue) => T) {
  const state = useCartContext();
  return selector ? selector(state) : state;
}

export const selectCartCount = (state: CartContextValue) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: CartContextValue) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartLines = (state: CartContextValue) =>
  state.items.map((item) => ({
    merchandiseId: item.variantId ?? item.id,
    quantity: item.quantity
  }));
