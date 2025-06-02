/**
 * Configurações do cliente Perfex
 * @module config
 */

/**
 * Classe de configuração para o cliente Perfex
 * @class Config
 */
class Config {
  /**
   * Cria uma nova instância de configuração
   * @param {Object} options - Opções de configuração
   * @param {string} options.baseUrl - URL base do Perfex CRM
   * @param {string} options.apiKey - Chave da API
   * @param {string} options.apiToken - Token da API
   * @param {number} [options.timeout=30000] - Timeout para requisições em ms
   * @param {boolean} [options.debug=false] - Modo debug
   */
  constructor(options) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, ''); // Remove barras no final
    this.apiKey = options.apiKey;
    this.apiToken = options.apiToken;
    this.timeout = options.timeout || 30000;
    this.debug = options.debug || false;
  }

  /**
   * Obtém a URL base
   * @returns {string} URL base
   */
  getBaseUrl() {
    return this.baseUrl;
  }

  /**
   * Obtém a chave da API
   * @returns {string} Chave da API
   */
  getApiKey() {
    return this.apiKey;
  }

  /**
   * Obtém o token da API
   * @returns {string} Token da API
   */
  getApiToken() {
    return this.apiToken;
  }

  /**
   * Define um novo token da API
   * @param {string} token - Novo token da API
   */
  setApiToken(token) {
    this.apiToken = token;
  }

  /**
   * Obtém o timeout para requisições
   * @returns {number} Timeout em ms
   */
  getTimeout() {
    return this.timeout;
  }

  /**
   * Verifica se o modo debug está ativado
   * @returns {boolean} Status do modo debug
   */
  isDebugEnabled() {
    return this.debug;
  }
}

module.exports = Config;
