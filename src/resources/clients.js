/**
 * Recurso de clientes da API
 * @module clients
 */

const Validator = require('../utils/validator');

/**
 * Classe para gerenciamento de clientes
 * @class ClientsResource
 */
class ClientsResource {
  /**
   * Cria uma nova instância do recurso de clientes
   * @param {Object} request - Instância do gerenciador de requisições
   */
  constructor(request) {
    this.request = request;
    this.endpoint = '/api/clients';
  }

  /**
   * Lista todos os clientes
   * @param {Object} [params={}] - Parâmetros de filtro e paginação
   * @returns {Promise<Array>} Lista de clientes
   */
  async list(params = {}) {
    return this.request.get(this.endpoint, params);
  }

  /**
   * Obtém um cliente pelo ID
   * @param {number} id - ID do cliente
   * @returns {Promise<Object>} Dados do cliente
   */
  async get(id) {
    if (!id) {
      throw new Error('ID do cliente é obrigatório');
    }
    return this.request.get(`${this.endpoint}/${id}`);
  }

  /**
   * Cria um novo cliente
   * @param {Object} data - Dados do cliente
   * @returns {Promise<Object>} Cliente criado
   */
  async create(data) {
    const validatedData = Validator.validateClientParams(data);
    return this.request.post(this.endpoint, validatedData);
  }

  /**
   * Atualiza um cliente existente
   * @param {number} id - ID do cliente
   * @param {Object} data - Dados do cliente
   * @returns {Promise<Object>} Cliente atualizado
   */
  async update(id, data) {
    if (!id) {
      throw new Error('ID do cliente é obrigatório');
    }
    const validatedData = Validator.validateClientParams(data);
    return this.request.put(`${this.endpoint}/${id}`, validatedData);
  }

  /**
   * Remove um cliente
   * @param {number} id - ID do cliente
   * @returns {Promise<Object>} Resultado da operação
   */
  async delete(id) {
    if (!id) {
      throw new Error('ID do cliente é obrigatório');
    }
    return this.request.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Busca clientes por filtros
   * @param {Object} filters - Filtros de busca
   * @returns {Promise<Array>} Lista de clientes
   */
  async search(filters = {}) {
    return this.request.get(`${this.endpoint}/search`, filters);
  }
}

module.exports = ClientsResource;
