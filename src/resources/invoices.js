/**
 * Recurso de faturas da API
 * @module invoices
 */

const Validator = require('../utils/validator');

/**
 * Classe para gerenciamento de faturas
 * @class InvoicesResource
 */
class InvoicesResource {
  /**
   * Cria uma nova instância do recurso de faturas
   * @param {Object} request - Instância do gerenciador de requisições
   */
  constructor(request) {
    this.request = request;
    this.endpoint = '/api/invoices';
  }

  /**
   * Lista todas as faturas
   * @param {Object} [params={}] - Parâmetros de filtro e paginação
   * @returns {Promise<Array>} Lista de faturas
   */
  async list(params = {}) {
    return this.request.get(this.endpoint, params);
  }

  /**
   * Obtém uma fatura pelo ID
   * @param {number} id - ID da fatura
   * @returns {Promise<Object>} Dados da fatura
   */
  async get(id) {
    if (!id) {
      throw new Error('ID da fatura é obrigatório');
    }
    return this.request.get(`${this.endpoint}/${id}`);
  }

  /**
   * Cria uma nova fatura
   * @param {Object} data - Dados da fatura
   * @returns {Promise<Object>} Fatura criada
   */
  async create(data) {
    const validatedData = Validator.validateInvoiceParams(data);
    return this.request.post(this.endpoint, validatedData);
  }

  /**
   * Atualiza uma fatura existente
   * @param {number} id - ID da fatura
   * @param {Object} data - Dados da fatura
   * @returns {Promise<Object>} Fatura atualizada
   */
  async update(id, data) {
    if (!id) {
      throw new Error('ID da fatura é obrigatório');
    }
    const validatedData = Validator.validateInvoiceParams(data);
    return this.request.put(`${this.endpoint}/${id}`, validatedData);
  }

  /**
   * Remove uma fatura
   * @param {number} id - ID da fatura
   * @returns {Promise<Object>} Resultado da operação
   */
  async delete(id) {
    if (!id) {
      throw new Error('ID da fatura é obrigatório');
    }
    return this.request.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Lista faturas de um cliente específico
   * @param {number} clientId - ID do cliente
   * @returns {Promise<Array>} Lista de faturas do cliente
   */
  async listByClient(clientId) {
    if (!clientId) {
      throw new Error('ID do cliente é obrigatório');
    }
    return this.request.get(`/api/clients/${clientId}/invoices`);
  }

  /**
   * Marca uma fatura como paga
   * @param {number} id - ID da fatura
   * @returns {Promise<Object>} Resultado da operação
   */
  async markAsPaid(id) {
    if (!id) {
      throw new Error('ID da fatura é obrigatório');
    }
    return this.request.post(`${this.endpoint}/${id}/mark_as_paid`);
  }
}

module.exports = InvoicesResource;
