/**
 * Cliente principal para integração com o Perfex CRM
 * @module client
 */

const axios = require('axios');
const Config = require('./config');
const Auth = require('./auth');
const Resources = require('./resources');
const { RequestError } = require('./utils/error-handler');

/**
 * Cliente principal para o Perfex CRM
 * @class PerfexClient
 */
class PerfexClient {
  /**
   * Cria uma nova instância do cliente Perfex
   * @param {Object} options - Opções de configuração
   * @param {string} options.baseUrl - URL base do Perfex CRM
   * @param {string} options.apiKey - Chave da API
   * @param {string} options.apiToken - Token da API
   * @param {number} [options.timeout=30000] - Timeout para requisições em ms
   * @param {boolean} [options.debug=false] - Modo debug
   */
  constructor(options) {
    if (!options || !options.baseUrl || !options.apiKey || !options.apiToken) {
      throw new Error('É necessário fornecer baseUrl, apiKey e apiToken');
    }

    this.config = new Config(options);
    this.auth = new Auth(this.config);
    
    // Configurar cliente HTTP
    this.httpClient = axios.create({
      baseURL: this.config.getBaseUrl(),
      timeout: this.config.getTimeout(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Adicionar interceptor para autenticação
    this.httpClient.interceptors.request.use(
      config => this.auth.applyAuthHeaders(config),
      error => Promise.reject(error)
    );

    // Adicionar interceptor para tratamento de erros
    this.httpClient.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          throw new RequestError(
            error.response.data.message || 'Erro na requisição',
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          throw new RequestError('Sem resposta do servidor', 0, null);
        } else {
          throw new RequestError('Erro ao configurar requisição', 0, null);
        }
      }
    );

    // Inicializar recursos
    this._initResources();
  }

  /**
   * Inicializa os recursos da API
   * @private
   */
  _initResources() {
    const resources = Resources.getResources(this.httpClient, this.config);
    
    // Adicionar cada recurso como propriedade do cliente
    Object.keys(resources).forEach(key => {
      this[key] = resources[key];
    });
  }

  /**
   * Verifica se a conexão com a API está funcionando
   * @returns {Promise<boolean>} - True se a conexão estiver funcionando
   */
  async testConnection() {
    try {
      const response = await this.httpClient.get('/api/ping');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

module.exports = PerfexClient;
