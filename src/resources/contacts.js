/**
 * Recurso de contatos da API
 * @module contacts
 */

const Validator = require('../utils/validator');

/**
 * Classe para gerenciamento de contatos
 * @class ContactsResource
 */
class ContactsResource {
  /**
   * Cria uma nova instância do recurso de contatos
   * @param {Object} request - Instância do gerenciador de requisições
   */
  constructor(request) {
    this.request = request;
    this.endpoint = '/api/contacts';
  }

  /**
   * Lista todos os contatos
   * @param {Object} [params={}] - Parâmetros de filtro e paginação
   * @returns {Promise<Array>} Lista de contatos
   */
  async list(params = {}) {
    return this.request.get(this.endpoint, params);
  }

  /**
   * Obtém um contato pelo ID
   * @param {number} id - ID do contato
   * @returns {Promise<Object>} Dados do contato
   */
  async get(id) {
    if (!id) {
      throw new Error('ID do contato é obrigatório');
    }
    return this.request.get(`${this.endpoint}/${id}`);
  }

  /**
   * Cria um novo contato
   * @param {Object} data - Dados do contato
   * @returns {Promise<Object>} Contato criado
   */
  async create(data) {
    const validatedData = Validator.validateContactParams(data);
    return this.request.post(this.endpoint, validatedData);
  }

  /**
   * Atualiza um contato existente
   * @param {number} id - ID do contato
   * @param {Object} data - Dados do contato
   * @returns {Promise<Object>} Contato atualizado
   */
  async update(id, data) {
    if (!id) {
      throw new Error('ID do contato é obrigatório');
    }
    const validatedData = Validator.validateContactParams(data);
    return this.request.put(`${this.endpoint}/${id}`, validatedData);
  }

  /**
   * Remove um contato
   * @param {number} id - ID do contato
   * @returns {Promise<Object>} Resultado da operação
   */
  async delete(id) {
    if (!id) {
      throw new Error('ID do contato é obrigatório');
    }
    return this.request.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Busca contatos por filtros
   * @param {Object} filters - Filtros de busca
   * @returns {Promise<Array>} Lista de contatos
   */
  async search(filters = {}) {
    return this.request.get(`${this.endpoint}/search`, filters);
  }

  /**
   * Lista contatos de um cliente específico
   * @param {number} clientId - ID do cliente
   * @returns {Promise<Array>} Lista de contatos do cliente
   */
  async listByClient(clientId) {
    if (!clientId) {
      throw new Error('ID do cliente é obrigatório');
    }
    return this.request.get(`/api/clients/${clientId}/contacts`);
  }
}

module.exports = ContactsResource;
