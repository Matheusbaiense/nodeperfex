/**
 * Utilitário para validação de parâmetros
 * @module validator
 */

const Joi = require('joi');
const { ValidationError } = require('./error-handler');

/**
 * Classe de validação para parâmetros
 * @class Validator
 */
class Validator {
  /**
   * Valida parâmetros de cliente
   * @param {Object} params - Parâmetros do cliente
   * @returns {Object} Parâmetros validados
   * @throws {ValidationError} Se a validação falhar
   */
  static validateClientParams(params) {
    const schema = Joi.object({
      company: Joi.string().required(),
      vat: Joi.string().allow('', null),
      phonenumber: Joi.string().allow('', null),
      country: Joi.string().allow('', null),
      city: Joi.string().allow('', null),
      zip: Joi.string().allow('', null),
      state: Joi.string().allow('', null),
      address: Joi.string().allow('', null),
      website: Joi.string().allow('', null),
      active: Joi.number().valid(0, 1).default(1)
    });

    const { error, value } = schema.validate(params);
    
    if (error) {
      throw new ValidationError('Erro de validação nos parâmetros do cliente', error.details);
    }
    
    return value;
  }

  /**
   * Valida parâmetros de contato
   * @param {Object} params - Parâmetros do contato
   * @returns {Object} Parâmetros validados
   * @throws {ValidationError} Se a validação falhar
   */
  static validateContactParams(params) {
    const schema = Joi.object({
      userid: Joi.number().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().allow('', null),
      email: Joi.string().email().required(),
      phonenumber: Joi.string().allow('', null),
      title: Joi.string().allow('', null),
      is_primary: Joi.number().valid(0, 1).default(0),
      password: Joi.string().allow('', null),
      active: Joi.number().valid(0, 1).default(1)
    });

    const { error, value } = schema.validate(params);
    
    if (error) {
      throw new ValidationError('Erro de validação nos parâmetros do contato', error.details);
    }
    
    return value;
  }

  /**
   * Valida parâmetros de lead
   * @param {Object} params - Parâmetros do lead
   * @returns {Object} Parâmetros validados
   * @throws {ValidationError} Se a validação falhar
   */
  static validateLeadParams(params) {
    const schema = Joi.object({
      name: Joi.string().required(),
      source: Joi.number(),
      status: Joi.number(),
      assigned: Joi.number(),
      email: Joi.string().email().allow('', null),
      phonenumber: Joi.string().allow('', null),
      company: Joi.string().allow('', null),
      address: Joi.string().allow('', null),
      city: Joi.string().allow('', null),
      state: Joi.string().allow('', null),
      country: Joi.string().allow('', null),
      zip: Joi.string().allow('', null),
      description: Joi.string().allow('', null)
    });

    const { error, value } = schema.validate(params);
    
    if (error) {
      throw new ValidationError('Erro de validação nos parâmetros do lead', error.details);
    }
    
    return value;
  }

  /**
   * Valida parâmetros de projeto
   * @param {Object} params - Parâmetros do projeto
   * @returns {Object} Parâmetros validados
   * @throws {ValidationError} Se a validação falhar
   */
  static validateProjectParams(params) {
    const schema = Joi.object({
      name: Joi.string().required(),
      clientid: Joi.number().required(),
      billing_type: Joi.number(),
      status: Joi.number(),
      start_date: Joi.date().iso(),
      deadline: Joi.date().iso().allow('', null),
      description: Joi.string().allow('', null),
      project_cost: Joi.number().allow('', null),
      project_rate_per_hour: Joi.number().allow('', null),
      estimated_hours: Joi.number().allow('', null),
      members: Joi.array().items(Joi.number())
    });

    const { error, value } = schema.validate(params);
    
    if (error) {
      throw new ValidationError('Erro de validação nos parâmetros do projeto', error.details);
    }
    
    return value;
  }

  /**
   * Valida parâmetros de tarefa
   * @param {Object} params - Parâmetros da tarefa
   * @returns {Object} Parâmetros validados
   * @throws {ValidationError} Se a validação falhar
   */
  static validateTaskParams(params) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow('', null),
      priority: Joi.number().valid(1, 2, 3, 4, 5),
      status: Joi.number(),
      startdate: Joi.date().iso(),
      duedate: Joi.date().iso().allow('', null),
      assignees: Joi.array().items(Joi.number()),
      project_id: Joi.number().allow('', null),
      milestone: Joi.number().allow('', null),
      rel_id: Joi.number().allow('', null),
      rel_type: Joi.string().allow('', null)
    });

    const { error, value } = schema.validate(params);
    
    if (error) {
      throw new ValidationError('Erro de validação nos parâmetros da tarefa', error.details);
    }
    
    return value;
  }

  /**
   * Valida parâmetros de fatura
   * @param {Object} params - Parâmetros da fatura
   * @returns {Object} Parâmetros validados
   * @throws {ValidationError} Se a validação falhar
   */
  static validateInvoiceParams(params) {
    const schema = Joi.object({
      clientid: Joi.number().required(),
      number: Joi.string().allow('', null),
      date: Joi.date().iso().required(),
      duedate: Joi.date().iso().required(),
      currency: Joi.number(),
      subtotal: Joi.number(),
      total: Joi.number(),
      status: Joi.number(),
      project_id: Joi.number().allow('', null),
      items: Joi.array().items(
        Joi.object({
          description: Joi.string().required(),
          long_description: Joi.string().allow('', null),
          qty: Joi.number().required(),
          rate: Joi.number().required(),
          taxname: Joi.array().items(Joi.string())
        })
      )
    });

    const { error, value } = schema.validate(params);
    
    if (error) {
      throw new ValidationError('Erro de validação nos parâmetros da fatura', error.details);
    }
    
    return value;
  }
}

module.exports = Validator;
