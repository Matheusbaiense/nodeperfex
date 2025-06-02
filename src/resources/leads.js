/**
 * Recurso de leads da API
 * @module leads
 */

const Validator = require('../utils/validator');

/**
 * Classe para gerenciamento de leads
 * @class LeadsResource
 */
class LeadsResource {
  /**
   * Cria uma nova instância do recurso de leads
   * @param {Object} request - Instância do gerenciador de requisições
   */
  constructor(request) {
    this.request = request;
    this.endpoint = '/api/leads';
  }

  /**
   * Lista todos os leads
   * @param {Object} [params={}] - Parâmetros de filtro e paginação
   * @returns {Promise<Array>} Lista de leads
   */
  async list(params = {}) {
    return this.request.get(this.endpoint, params);
  }

  /**
   * Obtém um lead pelo ID
   * @param {number} id - ID do lead
   * @returns {Promise<Object>} Dados do lead
   */
  async get(id) {
    if (!id) {
      throw new Error('ID do lead é obrigatório');
    }
    return this.request.get(`${this.endpoint}/${id}`);
  }

  /**
   * Cria um novo lead
   * @param {Object} data - Dados do lead
   * @returns {Promise<Object>} Lead criado
   */
  async create(data) {
    const validatedData = Validator.validateLeadParams(data);
    return this.request.post(this.endpoint, validatedData);
  }

  /**
   * Atualiza um lead existente
   * @param {number} id - ID do lead
   * @param {Object} data - Dados do lead
   * @returns {Promise<Object>} Lead atualizado
   */
  async update(id, data) {
    if (!id) {
      throw new Error('ID do lead é obrigatório');
    }
    const validatedData = Validator.validateLeadParams(data);
    return this.request.put(`${this.endpoint}/${id}`, validatedData);
  }

  /**
   * Remove um lead
   * @param {number} id - ID do lead
   * @returns {Promise<Object>} Resultado da operação
   */
  async delete(id) {
    if (!id) {
      throw new Error('ID do lead é obrigatório');
    }
    return this.request.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Converte um lead em cliente
   * @param {number} id - ID do lead
   * @param {Object} data - Dados para conversão
   * @returns {Promise<Object>} Resultado da conversão
   */
  async convert(id, data) {
    if (!id) {
      throw new Error('ID do lead é obrigatório');
    }
    return this.request.post(`${this.endpoint}/${id}/convert`, data);
  }

  /**
   * Busca leads por filtros
   * @param {Object} filters - Filtros de busca
   * @returns {Promise<Array>} Lista de leads
   */
  async search(filters = {}) {
    return this.request.get(`${this.endpoint}/search`, filters);
  }
}

module.exports = LeadsResource;
