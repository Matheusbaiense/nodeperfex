# API do Node Community para Perfex CRM

Esta documentação descreve os endpoints e funcionalidades disponíveis na biblioteca Node Community para Perfex CRM.

## Autenticação

Todas as requisições à API requerem autenticação via API Key e Token.

```javascript
const PerfexClient = require('node-community-perfex');

const perfex = new PerfexClient({
  baseUrl: 'https://seu-perfex.com',
  apiKey: 'sua-api-key',
  apiToken: 'seu-api-token'
});
```

## Clientes

### Listar todos os clientes

```javascript
const clients = await perfex.clients.list();
```

### Obter cliente por ID

```javascript
const client = await perfex.clients.get(clientId);
```

### Criar novo cliente

```javascript
const newClient = {
  company: 'Empresa Exemplo',
  vat: '12345678901',
  phonenumber: '11999999999',
  country: 'Brasil',
  city: 'São Paulo',
  zip: '01234-567',
  state: 'SP',
  address: 'Rua Exemplo, 123'
};

const createdClient = await perfex.clients.create(newClient);
```

### Atualizar cliente existente

```javascript
const updateData = {
  company: 'Empresa Atualizada',
  phonenumber: '11988888888',
  address: 'Rua Atualizada, 456'
};

const updatedClient = await perfex.clients.update(clientId, updateData);
```

### Deletar cliente

```javascript
await perfex.clients.delete(clientId);
```

### Buscar clientes por filtros

```javascript
const filters = { active: 1 };
const filteredClients = await perfex.clients.search(filters);
```

## Contatos

### Listar todos os contatos

```javascript
const contacts = await perfex.contacts.list();
```

### Obter contato por ID

```javascript
const contact = await perfex.contacts.get(contactId);
```

### Criar novo contato

```javascript
const newContact = {
  userid: clientId,
  firstname: 'João',
  lastname: 'Silva',
  email: 'joao.silva@exemplo.com',
  phonenumber: '11999999999',
  title: 'Gerente',
  is_primary: 0,
  password: 'senha123',
  active: 1
};

const createdContact = await perfex.contacts.create(newContact);
```

### Atualizar contato existente

```javascript
const updateData = {
  userid: clientId,
  firstname: 'João',
  email: 'joao.silva@exemplo.com',
  phonenumber: '11988888888',
  title: 'Diretor'
};

const updatedContact = await perfex.contacts.update(contactId, updateData);
```

### Deletar contato

```javascript
await perfex.contacts.delete(contactId);
```

### Listar contatos de um cliente específico

```javascript
const clientContacts = await perfex.contacts.listByClient(clientId);
```

## Leads

### Listar todos os leads

```javascript
const leads = await perfex.leads.list();
```

### Obter lead por ID

```javascript
const lead = await perfex.leads.get(leadId);
```

### Criar novo lead

```javascript
const newLead = {
  name: 'Lead Exemplo',
  source: 1,
  status: 1,
  email: 'lead@exemplo.com',
  phonenumber: '11999999999',
  company: 'Empresa Lead',
  address: 'Rua Lead, 123',
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
  zip: '01234-567'
};

const createdLead = await perfex.leads.create(newLead);
```

### Atualizar lead existente

```javascript
const updateData = {
  name: 'Lead Atualizado',
  status: 2,
  phonenumber: '11988888888'
};

const updatedLead = await perfex.leads.update(leadId, updateData);
```

### Deletar lead

```javascript
await perfex.leads.delete(leadId);
```

### Converter lead em cliente

```javascript
const conversionData = {
  client_id: null, // Deixe null para criar um novo cliente
  contact_id: null // Deixe null para criar um novo contato
};

const result = await perfex.leads.convert(leadId, conversionData);
```

## Projetos

### Listar todos os projetos

```javascript
const projects = await perfex.projects.list();
```

### Obter projeto por ID

```javascript
const project = await perfex.projects.get(projectId);
```

### Criar novo projeto

```javascript
const newProject = {
  name: 'Projeto Exemplo',
  clientid: clientId,
  billing_type: 1,
  status: 1,
  start_date: '2025-06-01',
  deadline: '2025-07-01',
  description: 'Descrição do projeto exemplo',
  members: [1, 2, 3]
};

const createdProject = await perfex.projects.create(newProject);
```

### Atualizar projeto existente

```javascript
const updateData = {
  name: 'Projeto Atualizado',
  clientid: clientId,
  status: 2,
  deadline: '2025-08-01'
};

const updatedProject = await perfex.projects.update(projectId, updateData);
```

### Deletar projeto

```javascript
await perfex.projects.delete(projectId);
```

### Listar projetos de um cliente específico

```javascript
const clientProjects = await perfex.projects.listByClient(clientId);
```

## Tarefas

### Listar todas as tarefas

```javascript
const tasks = await perfex.tasks.list();
```

### Obter tarefa por ID

```javascript
const task = await perfex.tasks.get(taskId);
```

### Criar nova tarefa

```javascript
const newTask = {
  name: 'Tarefa Exemplo',
  description: 'Descrição da tarefa exemplo',
  priority: 3,
  status: 1,
  startdate: '2025-06-01',
  duedate: '2025-06-15',
  assignees: [1, 2],
  project_id: projectId
};

const createdTask = await perfex.tasks.create(newTask);
```

### Atualizar tarefa existente

```javascript
const updateData = {
  name: 'Tarefa Atualizada',
  priority: 4,
  status: 2,
  duedate: '2025-06-20'
};

const updatedTask = await perfex.tasks.update(taskId, updateData);
```

### Deletar tarefa

```javascript
await perfex.tasks.delete(taskId);
```

### Listar tarefas de um projeto específico

```javascript
const projectTasks = await perfex.tasks.listByProject(projectId);
```

## Faturas

### Listar todas as faturas

```javascript
const invoices = await perfex.invoices.list();
```

### Obter fatura por ID

```javascript
const invoice = await perfex.invoices.get(invoiceId);
```

### Criar nova fatura

```javascript
const newInvoice = {
  clientid: clientId,
  date: '2025-06-01',
  duedate: '2025-06-15',
  currency: 1,
  items: [
    {
      description: 'Item 1',
      long_description: 'Descrição detalhada do item 1',
      qty: 2,
      rate: 100,
      taxname: ['IVA']
    },
    {
      description: 'Item 2',
      long_description: 'Descrição detalhada do item 2',
      qty: 1,
      rate: 200,
      taxname: ['IVA']
    }
  ]
};

const createdInvoice = await perfex.invoices.create(newInvoice);
```

### Atualizar fatura existente

```javascript
const updateData = {
  clientid: clientId,
  date: '2025-06-01',
  duedate: '2025-06-30',
  status: 2
};

const updatedInvoice = await perfex.invoices.update(invoiceId, updateData);
```

### Deletar fatura

```javascript
await perfex.invoices.delete(invoiceId);
```

### Listar faturas de um cliente específico

```javascript
const clientInvoices = await perfex.invoices.listByClient(clientId);
```

### Marcar fatura como paga

```javascript
await perfex.invoices.markAsPaid(invoiceId);
```

## Tratamento de Erros

A biblioteca inclui tratamento robusto de erros:

```javascript
try {
  const clients = await perfex.clients.list();
  console.log('Clientes:', clients);
} catch (error) {
  if (error.name === 'RequestError') {
    console.error(`Erro na requisição: ${error.message}`);
    console.error(`Código de status: ${error.statusCode}`);
    console.error('Dados do erro:', error.data);
  } else if (error.name === 'ValidationError') {
    console.error(`Erro de validação: ${error.message}`);
    console.error('Detalhes:', error.details);
  } else {
    console.error(`Erro: ${error.message}`);
  }
}
```
