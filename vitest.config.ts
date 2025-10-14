import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
<<<<<<< HEAD
    include: ['lib/__tests__/**/*.test.ts'],
    exclude: ['e2e/**/*'],
=======
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
    setupFiles: [],
    coverage: {
      reporter: ['text', 'lcov'],
      enabled: false
    }
  },
  resolve: {
    alias: {
      '@': new URL('./', import.meta.url).pathname
    }
  }
});
