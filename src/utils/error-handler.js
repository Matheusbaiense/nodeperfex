/**
 * Utilitário para tratamento de erros
 * @module error-handler
 */

/**
 * Erro personalizado para requisições
 * @class RequestError
 * @extends Error
 */
class RequestError extends Error {
  /**
   * Cria uma nova instância de erro de requisição
   * @param {string} message - Mensagem de erro
   * @param {number} statusCode - Código de status HTTP
   * @param {Object} data - Dados adicionais do erro
   */
  constructor(message, statusCode, data) {
    super(message);
    this.name = 'RequestError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Erro personalizado para validação
 * @class ValidationError
 * @extends Error
 */
class ValidationError extends Error {
  /**
   * Cria uma nova instância de erro de validação
   * @param {string} message - Mensagem de erro
   * @param {Object} details - Detalhes da validação
   */
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

/**
 * Erro personalizado para autenticação
 * @class AuthenticationError
 * @extends Error
 */
class AuthenticationError extends Error {
  /**
   * Cria uma nova instância de erro de autenticação
   * @param {string} message - Mensagem de erro
   */
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

module.exports = {
  RequestError,
  ValidationError,
  AuthenticationError
};
