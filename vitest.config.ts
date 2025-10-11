import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    include: ['lib/__tests__/**/*.test.ts'],
    exclude: ['e2e/**/*'],
=======
>>>>>>> ea3c549 (refactor: simplify catalog definitions)
=======
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
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
