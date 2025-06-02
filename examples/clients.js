/**
 * Exemplo de operações com clientes
 * @module clients
 */

// Importar a biblioteca
const PerfexClient = require('../src');

// Configurações de conexão
const config = {
  baseUrl: 'https://seu-perfex.com',
  apiKey: 'sua-api-key',
  apiToken: 'seu-api-token'
};

// Criar instância do cliente
const perfex = new PerfexClient(config);

// Executar exemplo
(async () => {
  console.log('Iniciando exemplo de operações com clientes...');
  
  try {
    // Listar todos os clientes
    console.log('\n1. Listando todos os clientes:');
    const clients = await perfex.clients.list();
    console.log(`Total de clientes: ${clients.length}`);
    
    // Criar um novo cliente
    console.log('\n2. Criando um novo cliente:');
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
    
    console.log('Dados do novo cliente:', newClient);
    
    // Comentado para evitar criação real durante testes
    // const createdClient = await perfex.clients.create(newClient);
    // console.log('Cliente criado com sucesso:', createdClient);
    
    // Buscar cliente por ID
    console.log('\n3. Buscando cliente por ID:');
    if (clients.length > 0) {
      const clientId = clients[0].id;
      console.log(`Buscando cliente com ID: ${clientId}`);
      
      const client = await perfex.clients.get(clientId);
      console.log('Cliente encontrado:', client);
      
      // Atualizar cliente
      console.log('\n4. Atualizando cliente:');
      const updateData = {
        company: client.company,
        phonenumber: '11988888888',
        address: 'Rua Atualizada, 456'
      };
      
      console.log('Dados para atualização:', updateData);
      
      // Comentado para evitar atualização real durante testes
      // const updatedClient = await perfex.clients.update(clientId, updateData);
      // console.log('Cliente atualizado com sucesso:', updatedClient);
    } else {
      console.log('Nenhum cliente disponível para busca/atualização');
    }
    
    // Buscar clientes com filtros
    console.log('\n5. Buscando clientes com filtros:');
    const filters = { active: 1 };
    console.log('Filtros:', filters);
    
    const filteredClients = await perfex.clients.search(filters);
    console.log(`Clientes encontrados: ${filteredClients.length}`);
    
  } catch (error) {
    console.error('Erro durante as operações com clientes:', error.message);
    if (error.statusCode) {
      console.error(`Código de status: ${error.statusCode}`);
    }
    if (error.data) {
      console.error('Dados do erro:', error.data);
    }
  }
  
  console.log('\nExemplo de operações com clientes concluído!');
})();
