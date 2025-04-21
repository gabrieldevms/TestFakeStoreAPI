import { request } from '@playwright/test';

export async function createApiContext() {
  return await request.newContext({
    baseURL: 'https://fakestoreapi.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
}