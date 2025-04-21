# Test info

- Name: API - Products Endpoint >> P03 - Buscar produto por ID inválido
- Location: C:\Users\gabrielSantos\Desktop\DesafioTecnico-AnalistadeQualidade\tests\api\products.spec.ts:29:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
    at C:\Users\gabrielSantos\Desktop\DesafioTecnico-AnalistadeQualidade\tests\api\products.spec.ts:31:31
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { createApiContext } from '../../utils/apiClient';
   3 |
   4 | test.describe('API - Products Endpoint', () => {
   5 |   let api;
   6 |
   7 |   test.beforeAll(async () => {
   8 |     api = await createApiContext();
   9 |   });
  10 |
  11 |   test('P01 - Listar todos os produtos', async () => {
  12 |     const response = await api.get('/products');
  13 |     expect(response.status()).toBe(200);
  14 |
  15 |     const body = await response.json();
  16 |     expect(Array.isArray(body)).toBeTruthy();
  17 |     expect(body.length).toBeGreaterThan(0);
  18 |   });
  19 |
  20 |   test('P02 - Buscar produto por ID válido', async () => {
  21 |     const response = await api.get('/products/1');
  22 |     expect(response.status()).toBe(200);
  23 |
  24 |     const product = await response.json();
  25 |     expect(product).toHaveProperty('title');
  26 |     expect(product).toHaveProperty('price');
  27 |   });
  28 |
  29 |   test('P03 - Buscar produto por ID inválido', async () => {
  30 |     const response = await api.get('/products/id-not-exist');
> 31 |     expect(response.status()).toBe(404);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |   });
  33 | });
```