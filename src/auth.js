/**
 * Módulo de autenticação para o cliente Perfex
 * @module auth
 */

/**
 * Classe de autenticação para o cliente Perfex
 * @class Auth
 */
class Auth {
  /**
   * Cria uma nova instância de autenticação
   * @param {Object} config - Configuração do cliente
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Aplica os cabeçalhos de autenticação à requisição
   * @param {Object} requestConfig - Configuração da requisição
   * @returns {Object} Configuração da requisição com cabeçalhos de autenticação
   */
  applyAuthHeaders(requestConfig) {
    if (!requestConfig.headers) {
      requestConfig.headers = {};
    }

    requestConfig.headers['X-API-KEY'] = this.config.getApiKey();
    requestConfig.headers['X-API-TOKEN'] = this.config.getApiToken();

    return requestConfig;
  }

  /**
   * Atualiza o token da API
   * @param {string} newToken - Novo token da API
   */
  updateToken(newToken) {
    this.config.setApiToken(newToken);
  }

  /**
   * Verifica se as credenciais são válidas
   * @param {Object} httpClient - Cliente HTTP para fazer requisições
   * @returns {Promise<boolean>} - True se as credenciais forem válidas
   */
  async validateCredentials(httpClient) {
    try {
      const response = await httpClient.get('/api/auth/validate');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Auth;
