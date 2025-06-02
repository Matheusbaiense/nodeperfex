/**
 * Módulo de recursos da API
 * @module resources
 */

const ClientsResource = require('./clients');
const ContactsResource = require('./contacts');
const LeadsResource = require('./leads');
const ProjectsResource = require('./projects');
const TasksResource = require('./tasks');
const InvoicesResource = require('./invoices');
const Request = require('../utils/request');

/**
 * Obtém todos os recursos da API
 * @param {Object} httpClient - Cliente HTTP para fazer requisições
 * @param {Object} config - Configuração do cliente
 * @returns {Object} Objeto com todos os recursos
 */
function getResources(httpClient, config) {
  const request = new Request(httpClient, config);
  
  return {
    clients: new ClientsResource(request),
    contacts: new ContactsResource(request),
    leads: new LeadsResource(request),
    projects: new ProjectsResource(request),
    tasks: new TasksResource(request),
    invoices: new InvoicesResource(request)
  };
}

module.exports = {
  getResources
};
