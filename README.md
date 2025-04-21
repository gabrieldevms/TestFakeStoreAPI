# Desafio Técnico - Analista de Qualidade


## 📌 Visão Geral do Desafio

API analisada: FakeStore API

Objetivos principais:

Garantia de qualidade desde o início

Testes de API com visão integrada

Antecipar riscos para o frontend


## 🧪 Estratégia de Testes

Endpoints analisados:

  /products (automatizado)

  /carts, /users, /auth/login (validados em matriz)

Critérios:

  Casos positivos e negativos

  Tipos de dados, autenticação e performance

  Consistência e segurança



## ✅  Casos de Teste da API FakeStore

Casos de Teste – /products

| ID  | Cenário                            | Tipo         | Validação                                     | Esperado                                 |
|-----|-------------------------------------|--------------|-----------------------------------------------|------------------------------------------|
| P01 | Listar todos os produtos           | Positivo     | Status code 200, array de produtos           | 200, array com length > 0               |
| P02 | Buscar produto por ID válido       | Positivo     | Retorna status 200, campos esperados         | 200, contém title, price etc.           |
| P03 | Buscar produto com ID inválido     | Negativo     | Status 404 ou objeto vazio                   | 404 ou {}                               |
| P04 | Criar produto com dados válidos    | Positivo     | Status 200/201, produto criado corretamente  | Produto refletido no GET                |
| P05 | Criar produto sem campo obrigatório| Negativo     | Status 400, mensagem de erro                 | Validação clara                         |
| P06 | Criar produto com tipo errado      | Negativo     | Tipo incorreto (ex: string no lugar de number)| Erro de validação ou 400                |
| P07 | Tempo de resposta do GET           | Performance  | Tempo < 2s                                    | < 2000ms                                 |
| P08 | Consistência após criação          | Consistência | POST seguido de GET                           | Dados persistem corretamente            |

---

Casos de Teste – /carts

| ID  | Cenário                                  | Tipo         | Validação                                      | Esperado                                 |
|-----|------------------------------------------|--------------|------------------------------------------------|------------------------------------------|
| C01 | Listar todos os carrinhos               | Positivo     | Status 200, array de objetos                   | 200, array com length >= 0              |
| C02 | Buscar carrinho por ID válido           | Positivo     | Status 200, campos: id, userId, products       | 200, estrutura correta                  |
| C03 | Buscar carrinho com ID inexistente      | Negativo     | 404 ou objeto vazio                            | 404 ou {}                                |
| C04 | Criar carrinho com dados válidos        | Positivo     | POST com userId, products -> resposta 200/201  | Carrinho criado com sucesso             |
| C05 | Criar carrinho sem produtos             | Negativo     | POST com userId mas sem products               | 400, erro de validação                  |
| C06 | Criar carrinho com produto inválido     | Negativo     | Produto com ID inexistente ou quantity negativa| Validação clara ou erro esperado        |
| C07 | Validar userId ausente ou inválido      | Negativo     | 400 ou mensagem de erro                       | Validação clara                         |
| C08 | Performance GET por ID                  | Performance  | Tempo de resposta < 2s                         | < 2000ms                                 |
| C09 | Consistência após criação               | Consistência | POST + GET subsequente retorna os dados       | Dados persistem corretamente            |

---

Casos de Teste – /users

| ID  | Cenário                                  | Tipo         | Validação                                      | Esperado                                 |
|-----|------------------------------------------|--------------|------------------------------------------------|------------------------------------------|
| U01 | Listar todos os usuários                | Positivo     | Status 200, array com estrutura de usuários    | 200, array com length >= 0              |
| U02 | Buscar usuário por ID válido            | Positivo     | Campos: id, email, username, address          | Dados completos                          |
| U03 | Buscar usuário inexistente              | Negativo     | 404 ou objeto vazio                            | 404 ou {}                                |
| U04 | Criar usuário com dados válidos         | Positivo     | POST com nome, email, senha, address          | 200/201, dados refletidos               |
| U05 | Criar usuário sem senha ou email        | Negativo     | Falha na validação                             | 400 ou mensagem de erro                 |
| U06 | Criar usuário com email duplicado       | Negativo     | Caso backend valide, deve impedir duplicação  | Erro de conflito ou 409                 |
| U07 | Tipos errados (ex: número no email)     | Negativo     | Validação de tipos                             | Erro ou mensagem clara                  |
| U08 | Performance GET por ID                  | Performance  | Tempo < 2s                                     | < 2000ms                                 |
| U09 | Segurança – senhas em texto plano       | Segurança    | Verificar se senha aparece em GET             | Nunca deve aparecer                     |

---

Casos de Teste – /auth/login

| ID  | Cenário                                  | Tipo         | Validação                                      | Esperado                                 |
|-----|------------------------------------------|--------------|------------------------------------------------|------------------------------------------|
| L01 | Login com credenciais válidas           | Positivo     | POST retorna token (campo token)               | Status 200, token JWT                   |
| L02 | Login com senha incorreta               | Negativo     | Retorna 401 ou 403                            | Erro de autenticação                    |
| L03 | Login com email inexistente             | Negativo     | Mesmo comportamento do L02                    | Erro claro                              |
| L04 | Login com campos vazios                 | Negativo     | Validação de obrigatoriedade                  | 400 ou erro                             |
| L05 | Campos com tipo errado (número no lugar de string) | Negativo | Validação de tipos                             | Erro de schema ou 400                   |
| L06 | Performance do login                     | Performance  | Tempo de resposta < 1.5s                       | Rápido para UX                          |
| L07 | Segurança – Senha vazando no response    | Segurança    | Garantir que não há retorno de senha           | Nunca deve retornar                     |
| L08 | Tentativas consecutivas (brute force)   | Segurança    | Avaliar se há limitação ou captcha            | Ideal: bloqueio após tentativas         |


## 🛠️ Estrutura da Automação

Tecnologia: Playwright com TypeScript

Pastas:

<pre> ```text ├── tests/ │ └── api/ │ └── products.spec.ts ├── utils/ │ └── apiClient.ts ``` </pre>


## 🔍 Exemplo de Teste Automatizado

test('Deve retornar produto por ID válido', async ({ request }) => {
  const response = await request.get('/products/1');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.id).toBe(1);
});


## 📊 Resultados dos Testes

Testes executados com sucesso

Casos de falha simulados e tratados

Tempo de resposta < 500ms


## 🔮 Visão Estratégica de Front-end

Fluxos prováveis:

 Login

 Listagem de produtos

 Carrinho

 Checkout

Validações esperadas:

 Funcionalidade: carregamento, filtros, ações

 Usabilidade: feedbacks visuais, mensagens de erro

 Segurança: tokens, permissões, falhas de sessão


## ⚙️ Dificuldades e Soluções

 Sem documentação: Testes exploratórios + análise de payloads

 Inconsistência nas respostas: Tratamento com assertions seguros

 Sem frontend: Simulação baseada em contratos REST


## ✅ Conclusão

 Cobertura estruturada e eficaz

 Automação clara, modular e escalável

 Estratégia pensada desde o início do ciclo


## Desenvolvido por: Gabriel Moreira

