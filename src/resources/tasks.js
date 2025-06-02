/**
 * Recurso de tarefas da API
 * @module tasks
 */

const Validator = require('../utils/validator');

/**
 * Classe para gerenciamento de tarefas
 * @class TasksResource
 */
class TasksResource {
  /**
   * Cria uma nova instância do recurso de tarefas
   * @param {Object} request - Instância do gerenciador de requisições
   */
  constructor(request) {
    this.request = request;
    this.endpoint = '/api/tasks';
  }

  /**
   * Lista todas as tarefas
   * @param {Object} [params={}] - Parâmetros de filtro e paginação
   * @returns {Promise<Array>} Lista de tarefas
   */
  async list(params = {}) {
    return this.request.get(this.endpoint, params);
  }

  /**
   * Obtém uma tarefa pelo ID
   * @param {number} id - ID da tarefa
   * @returns {Promise<Object>} Dados da tarefa
   */
  async get(id) {
    if (!id) {
      throw new Error('ID da tarefa é obrigatório');
    }
    return this.request.get(`${this.endpoint}/${id}`);
  }

  /**
   * Cria uma nova tarefa
   * @param {Object} data - Dados da tarefa
   * @returns {Promise<Object>} Tarefa criada
   */
  async create(data) {
    const validatedData = Validator.validateTaskParams(data);
    return this.request.post(this.endpoint, validatedData);
  }

  /**
   * Atualiza uma tarefa existente
   * @param {number} id - ID da tarefa
   * @param {Object} data - Dados da tarefa
   * @returns {Promise<Object>} Tarefa atualizada
   */
  async update(id, data) {
    if (!id) {
      throw new Error('ID da tarefa é obrigatório');
    }
    const validatedData = Validator.validateTaskParams(data);
    return this.request.put(`${this.endpoint}/${id}`, validatedData);
  }

  /**
   * Remove uma tarefa
   * @param {number} id - ID da tarefa
   * @returns {Promise<Object>} Resultado da operação
   */
  async delete(id) {
    if (!id) {
      throw new Error('ID da tarefa é obrigatório');
    }
    return this.request.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Lista tarefas de um projeto específico
   * @param {number} projectId - ID do projeto
   * @returns {Promise<Array>} Lista de tarefas do projeto
   */
  async listByProject(projectId) {
    if (!projectId) {
      throw new Error('ID do projeto é obrigatório');
    }
    return this.request.get(`/api/projects/${projectId}/tasks`);
  }
}

module.exports = TasksResource;
