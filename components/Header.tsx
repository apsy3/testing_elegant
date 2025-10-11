import dynamic from 'next/dynamic';

const HeaderClient = dynamic(() => import('./HeaderClient'), {
  ssr: false
});

export default HeaderClient;
