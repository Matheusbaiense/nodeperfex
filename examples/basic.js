/**
 * Exemplo básico de uso da biblioteca
 * @module basic
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

// Executar exemplo
(async () => {
  console.log('Iniciando exemplo básico...');
  
  // Testar conexão
  const connected = await testConnection();
  if (!connected) {
    console.log('Não foi possível conectar ao Perfex CRM. Verifique suas credenciais.');
    return;
  }
  
  // Listar clientes
  try {
    console.log('\nListando clientes:');
    const clients = await perfex.clients.list();
    console.log(`Total de clientes: ${clients.length}`);
    clients.slice(0, 3).forEach(client => {
      console.log(`- ${client.company} (ID: ${client.id})`);
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error.message);
  }
  
  // Listar contatos
  try {
    console.log('\nListando contatos:');
    const contacts = await perfex.contacts.list();
    console.log(`Total de contatos: ${contacts.length}`);
    contacts.slice(0, 3).forEach(contact => {
      console.log(`- ${contact.firstname} ${contact.lastname} (ID: ${contact.id})`);
    });
  } catch (error) {
    console.error('Erro ao listar contatos:', error.message);
  }
  
  console.log('\nExemplo básico concluído!');
})();
