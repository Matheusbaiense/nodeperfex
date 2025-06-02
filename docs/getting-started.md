# Guia de Início Rápido - Node Community para Perfex CRM

Este guia fornece instruções para começar a usar a biblioteca Node Community para Perfex CRM.

## Pré-requisitos

- Node.js 14.x ou superior
- Perfex CRM com o módulo WON API instalado e configurado
- Credenciais de API válidas (URL, API Key e Token)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/node-community-perfex.git
cd node-community-perfex
```

2. Instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com suas credenciais:

```
PERFEX_BASE_URL=https://seu-perfex.com
PERFEX_API_KEY=sua-api-key
PERFEX_API_TOKEN=seu-api-token
```

## Uso Básico

```javascript
// Importar a biblioteca
const PerfexClient = require('node-community-perfex');

// Configurações de conexão
const perfex = new PerfexClient({
  baseUrl: process.env.PERFEX_BASE_URL,
  apiKey: process.env.PERFEX_API_KEY,
  apiToken: process.env.PERFEX_API_TOKEN
});

// Testar conexão
async function testConnection() {
  try {
    const isConnected = await perfex.testConnection();
    console.log('Conexão com o Perfex CRM:', isConnected ? 'Sucesso' : 'Falha');
    return isConnected;
  } catch (error) {
    console.error('Erro ao testar conexão:', error.message);
    return false;
  }
}

// Listar clientes
async function listClients() {
  try {
    const clients = await perfex.clients.list();
    console.log(`Total de clientes: ${clients.length}`);
    return clients;
  } catch (error) {
    console.error('Erro ao listar clientes:', error.message);
    throw error;
  }
}

// Executar funções
(async () => {
  await testConnection();
  const clients = await listClients();
  console.log(clients);
})();
```

## Exemplos

Veja exemplos completos na pasta `examples/`:

- `basic.js`: Exemplo básico de conexão e listagem
- `clients.js`: Operações com clientes
- `contacts.js`: Operações com contatos

Para executar um exemplo:

```bash
node examples/basic.js
```

## Recursos Disponíveis

- Clientes (`perfex.clients`)
- Contatos (`perfex.contacts`)
- Leads (`perfex.leads`)
- Projetos (`perfex.projects`)
- Tarefas (`perfex.tasks`)
- Faturas (`perfex.invoices`)

## Documentação Completa

Para mais detalhes sobre todos os métodos disponíveis, consulte a [documentação da API](api.md).

## Tratamento de Erros

A biblioteca inclui classes de erro personalizadas:

- `RequestError`: Erros de requisição HTTP
- `ValidationError`: Erros de validação de parâmetros
- `AuthenticationError`: Erros de autenticação

Exemplo de tratamento de erros:

```javascript
try {
  const clients = await perfex.clients.list();
} catch (error) {
  if (error.name === 'RequestError') {
    console.error(`Erro na requisição: ${error.message}`);
  } else if (error.name === 'ValidationError') {
    console.error(`Erro de validação: ${error.message}`);
  } else {
    console.error(`Erro: ${error.message}`);
  }
}
```
