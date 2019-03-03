import { isString } from 'lodash/lang';
import requires from '../../helpers/requires';
import DefaultError from '../../responses/DefaultError';

/**
 * Response
 */
export default class Response {
  /**
   * Create new Response
   * @param {Object} params - params
   * @param {String} params.description - response description
   * @param {Number} params.statusCode - response http status code
   * @param {String} params.contentType - response content type
   * @param {Object|String} params.schema - response schema object or reference string
   */
  constructor({
    description,
    statusCode = 200,
    contentType = 'application/json',
    schema,
  }) {
    // check for required params
    requires(schema);

    // set class properties
    this._description = description;
    this._statusCode = statusCode;
    this._contentType = contentType;
    this.schema = schema;
  }

  /** @returns {String} response description */
  get description() { return this._description; }

  /** @returns {Number} response status code */
  get statusCode() { return this._statusCode; }

  /** @returns {String} response content type */
  get contentType() { return this._contentType; }

  /** @returns {Object} response schema */
  get schema() { return this._schema; }

  /** @param {Object|String} schema - set schema using object or reference string */
  set schema(schema) {
    if (isString(schema)) {
      this._schema = { $ref: schema };
    } else {
      this._schema = schema;
    }
  }

  /**
   * Export OpenAPI Specification
   */
  toOAS() {
    return {
      [this.statusCode]: {
        description: this.description,
        content: {
          [this.contentType]: {
            schema: this.schema,
          },
        },
      },
      default: DefaultError,
    };
  }
}
