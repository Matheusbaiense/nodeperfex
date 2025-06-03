# n8n-nodes-perfex

Um nó n8n para integração com o **Perfex CRM** através do módulo WON API.

## Instalação

Para instalar este nó n8n:

```bash
npm install n8n-nodes-perfex
```

## Configuração

Para usar este nó, você precisará configurar as credenciais do Perfex CRM:

1. **URL Base**: A URL base do seu Perfex CRM (ex: `https://seu-perfex.com`)
2. **API Token**: O token da API do Perfex CRM (único campo necessário para autenticação)

### Como obter o API Token

1. Acesse seu Perfex CRM
2. Vá em **Setup** → **Staff**
3. Edite um usuário staff
4. Na aba **API**, gere ou copie o token de API existente

## Recursos Disponíveis

Este nó oferece operações completas para os seguintes recursos do Perfex:

### 📋 Clients (Clientes)
- **Create**: Criar novo cliente
- **Read**: Obter dados de um cliente específico
- **Update**: Atualizar dados de um cliente
- **Delete**: Remover um cliente
- **List**: Listar todos os clientes

### 👤 Contacts (Contatos)
- **Create**: Criar novo contato
- **Read**: Obter dados de um contato específico
- **Update**: Atualizar dados de um contato
- **Delete**: Remover um contato
- **List**: Listar todos os contatos

### 🎯 Leads (Leads)
- **Create**: Criar novo lead
- **Read**: Obter dados de um lead específico
- **Update**: Atualizar dados de um lead
- **Delete**: Remover um lead
- **List**: Listar todos os leads

### 📊 Projects (Projetos)
- **Create**: Criar novo projeto
- **Read**: Obter dados de um projeto específico
- **Update**: Atualizar dados de um projeto
- **Delete**: Remover um projeto
- **List**: Listar todos os projetos

### ✅ Tasks (Tarefas)
- **Create**: Criar nova tarefa
- **Read**: Obter dados de uma tarefa específica
- **Update**: Atualizar dados de uma tarefa
- **Delete**: Remover uma tarefa
- **List**: Listar todas as tarefas

### 💰 Invoices (Faturas)
- **Create**: Criar nova fatura
- **Read**: Obter dados de uma fatura específica
- **Update**: Atualizar dados de uma fatura
- **Delete**: Remover uma fatura
- **List**: Listar todas as faturas

## Como Usar

1. **Adicionar Credenciais**: Configure sua URL base e API Token do Perfex
2. **Escolher Recurso**: Selecione o recurso desejado (Client, Contact, Lead, etc.)
3. **Escolher Operação**: Selecione a operação (Create, Read, Update, Delete, List)
4. **Preencher Parâmetros**: Complete os campos necessários para a operação

## Características Técnicas

- **Total de Operações**: 30 operações (6 recursos × 5 operações cada)
- **Autenticação**: Via API Token com header `X-API-TOKEN`
- **Dependências**: axios para requisições HTTP
- **Compatibilidade**: n8n versão 0.107.0+
- **Node.js**: Versão 16.0.0 ou superior

## Exemplos de Uso

### Criar um Cliente
1. Selecione **Recurso**: Client
2. Selecione **Operação**: Create
3. Preencha os campos obrigatórios como nome da empresa
4. Execute o workflow

### Listar Leads
1. Selecione **Recurso**: Lead
2. Selecione **Operação**: List
3. Execute para obter todos os leads

### Atualizar Projeto
1. Selecione **Recurso**: Project
2. Selecione **Operação**: Update
3. Forneça o ID do projeto e os campos a serem atualizados
4. Execute o workflow

## Suporte

- **Documentação da API**: [Perfex CRM API Documentation](https://docs.perfexcrm.com/api/)
- **Repositório**: [GitHub](https://github.com/Matheusbaiense/nodeperfex)
- **Issues**: [GitHub Issues](https://github.com/Matheusbaiense/nodeperfex/issues)

## Licença

MIT License

## Autor

**Matheus Baiense**
- Email: matheusbaiense@gmail.com
- GitHub: [@Matheusbaiense](https://github.com/Matheusbaiense)

## Agradecimentos

- Equipe do n8n por criar uma plataforma incrível
- Equipe do Perfex CRM por desenvolver um CRM robusto
- Todos os contribuidores que ajudaram no projeto
