/**
 * Exemplo de operações com contatos
 * @module contacts
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
  console.log('Iniciando exemplo de operações com contatos...');
  
  try {
    // Listar todos os clientes para obter um ID válido
    console.log('\nListando clientes para obter referência:');
    const clients = await perfex.clients.list();
    
    if (clients.length === 0) {
      console.log('Nenhum cliente disponível. É necessário ter pelo menos um cliente para criar contatos.');
      return;
    }
    
    const clientId = clients[0].id;
    console.log(`Usando cliente com ID: ${clientId}`);
    
    // Listar todos os contatos
    console.log('\n1. Listando todos os contatos:');
    const contacts = await perfex.contacts.list();
    console.log(`Total de contatos: ${contacts.length}`);
    
    // Criar um novo contato
    console.log('\n2. Criando um novo contato:');
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
    
    console.log('Dados do novo contato:', newContact);
    
    // Comentado para evitar criação real durante testes
    // const createdContact = await perfex.contacts.create(newContact);
    // console.log('Contato criado com sucesso:', createdContact);
    
    // Buscar contato por ID
    console.log('\n3. Buscando contato por ID:');
    if (contacts.length > 0) {
      const contactId = contacts[0].id;
      console.log(`Buscando contato com ID: ${contactId}`);
      
      const contact = await perfex.contacts.get(contactId);
      console.log('Contato encontrado:', contact);
      
      // Atualizar contato
      console.log('\n4. Atualizando contato:');
      const updateData = {
        userid: contact.userid,
        firstname: contact.firstname,
        email: contact.email,
        phonenumber: '11988888888',
        title: 'Diretor'
      };
      
      console.log('Dados para atualização:', updateData);
      
      // Comentado para evitar atualização real durante testes
      // const updatedContact = await perfex.contacts.update(contactId, updateData);
      // console.log('Contato atualizado com sucesso:', updatedContact);
    } else {
      console.log('Nenhum contato disponível para busca/atualização');
    }
    
    // Listar contatos de um cliente específico
    console.log('\n5. Listando contatos de um cliente específico:');
    console.log(`Buscando contatos do cliente com ID: ${clientId}`);
    
    const clientContacts = await perfex.contacts.listByClient(clientId);
    console.log(`Contatos encontrados: ${clientContacts.length}`);
    clientContacts.forEach(contact => {
      console.log(`- ${contact.firstname} ${contact.lastname} (${contact.email})`);
    });
    
  } catch (error) {
    console.error('Erro durante as operações com contatos:', error.message);
    if (error.statusCode) {
      console.error(`Código de status: ${error.statusCode}`);
    }
    if (error.data) {
      console.error('Dados do erro:', error.data);
    }
  }
  
  console.log('\nExemplo de operações com contatos concluído!');
})();
