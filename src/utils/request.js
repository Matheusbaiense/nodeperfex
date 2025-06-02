/**
 * Utilitário para requisições HTTP
 * @module request
 */

const { RequestError } = require('./error-handler');

/**
 * Classe para gerenciamento de requisições HTTP
 * @class Request
 */
class Request {
  /**
   * Cria uma nova instância do gerenciador de requisições
   * @param {Object} httpClient - Cliente HTTP para fazer requisições
   * @param {Object} config - Configuração do cliente
   */
  constructor(httpClient, config) {
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * Realiza uma requisição GET
   * @param {string} endpoint - Endpoint da API
   * @param {Object} [params={}] - Parâmetros da requisição
   * @returns {Promise<Object>} Resposta da requisição
   * @throws {RequestError} Se a requisição falhar
   */
  async get(endpoint, params = {}) {
    try {
      const response = await this.httpClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Realiza uma requisição POST
   * @param {string} endpoint - Endpoint da API
   * @param {Object} data - Dados a serem enviados
   * @returns {Promise<Object>} Resposta da requisição
   * @throws {RequestError} Se a requisição falhar
   */
  async post(endpoint, data) {
    try {
      const response = await this.httpClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Realiza uma requisição PUT
   * @param {string} endpoint - Endpoint da API
   * @param {Object} data - Dados a serem enviados
   * @returns {Promise<Object>} Resposta da requisição
   * @throws {RequestError} Se a requisição falhar
   */
  async put(endpoint, data) {
    try {
      const response = await this.httpClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Realiza uma requisição DELETE
   * @param {string} endpoint - Endpoint da API
   * @returns {Promise<Object>} Resposta da requisição
   * @throws {RequestError} Se a requisição falhar
   */
  async delete(endpoint) {
    try {
      const response = await this.httpClient.delete(endpoint);
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Trata erros de requisição
   * @param {Error} error - Erro da requisição
   * @private
   * @throws {RequestError} Erro tratado
   */
  _handleError(error) {
    if (this.config.isDebugEnabled()) {
      console.error('Erro na requisição:', error);
    }

    if (error.name === 'RequestError') {
      throw error;
    }

    throw new RequestError(
      error.message || 'Erro desconhecido na requisição',
      error.response?.status || 0,
      error.response?.data || null
    );
  }
}

module.exports = Request;
