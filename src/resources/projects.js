/**
 * Recurso de projetos da API
 * @module projects
 */

const Validator = require('../utils/validator');

/**
 * Classe para gerenciamento de projetos
 * @class ProjectsResource
 */
class ProjectsResource {
  /**
   * Cria uma nova instância do recurso de projetos
   * @param {Object} request - Instância do gerenciador de requisições
   */
  constructor(request) {
    this.request = request;
    this.endpoint = '/api/projects';
  }

  /**
   * Lista todos os projetos
   * @param {Object} [params={}] - Parâmetros de filtro e paginação
   * @returns {Promise<Array>} Lista de projetos
   */
  async list(params = {}) {
    return this.request.get(this.endpoint, params);
  }

  /**
   * Obtém um projeto pelo ID
   * @param {number} id - ID do projeto
   * @returns {Promise<Object>} Dados do projeto
   */
  async get(id) {
    if (!id) {
      throw new Error('ID do projeto é obrigatório');
    }
    return this.request.get(`${this.endpoint}/${id}`);
  }

  /**
   * Cria um novo projeto
   * @param {Object} data - Dados do projeto
   * @returns {Promise<Object>} Projeto criado
   */
  async create(data) {
    const validatedData = Validator.validateProjectParams(data);
    return this.request.post(this.endpoint, validatedData);
  }

  /**
   * Atualiza um projeto existente
   * @param {number} id - ID do projeto
   * @param {Object} data - Dados do projeto
   * @returns {Promise<Object>} Projeto atualizado
   */
  async update(id, data) {
    if (!id) {
      throw new Error('ID do projeto é obrigatório');
    }
    const validatedData = Validator.validateProjectParams(data);
    return this.request.put(`${this.endpoint}/${id}`, validatedData);
  }

  /**
   * Remove um projeto
   * @param {number} id - ID do projeto
   * @returns {Promise<Object>} Resultado da operação
   */
  async delete(id) {
    if (!id) {
      throw new Error('ID do projeto é obrigatório');
    }
    return this.request.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Lista projetos de um cliente específico
   * @param {number} clientId - ID do cliente
   * @returns {Promise<Array>} Lista de projetos do cliente
   */
  async listByClient(clientId) {
    if (!clientId) {
      throw new Error('ID do cliente é obrigatório');
    }
    return this.request.get(`/api/clients/${clientId}/projects`);
  }
}

module.exports = ProjectsResource;
