import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://fakestoreapi.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
