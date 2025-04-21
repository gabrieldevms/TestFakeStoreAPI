import { test, expect } from '@playwright/test';
import { createApiContext } from '../../utils/apiClient';

test.describe('API - Products Endpoint', () => {
  let api;

  test.beforeAll(async () => {
    api = await createApiContext();
  });

  test('P01 - Listar todos os produtos', async () => {
    const response = await api.get('/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('P02 - Buscar produto por ID válido', async () => {
    const response = await api.get('/products/1');
    expect(response.status()).toBe(200);

    const product = await response.json();
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });

  test('P03 - Buscar produto por ID inválido', async () => {
    const response = await api.get('/products/id-not-exist');
    const status = response.status();
  
    expect([404, 200]).toContain(status);
  
    if (status === 200) {
      const raw = await response.text();
  
      // Valida se está vazio, nulo ou um objeto vazio
      expect(
        raw === '' || raw === '{}' || raw === 'null'
      ).toBe(true);
    }
  });
  
});
