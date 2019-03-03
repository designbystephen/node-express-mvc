import express from 'express';
import Response from './Response';
import schema from '../schemas/health';

/**
 * Controller
 */
export default class Controller {
  /**
   * Create new controller
   */
  constructor() {
    // create and set express router
    this._router = express.Router();

    // wire up middlewares
    this._router.use(this.responseMiddleWares.bind(this));
  }

  /** @returns {Object} express router */
  get router() { return this._router; }

  /**
   * Get method for this route
   * @param  {...any} args - arguments for express route handler
   */
  get(...args) { return this.routeHandlerWrapper('get', ...args); }

  /**
   * Route handler wrapper for express route http method functions
   * @param {String} method - http method
   * @param  {...any} args - args for express route handler
   */
  routeHandlerWrapper(method, ...args) {
    return this.router[method](...args);
  }

  /**
   * Send JSON response
   * @param {Object} res - express response object
   * @param {Object} body - JSON body for response
   */
  static sendJsonResponse(res, body) {
    // FIXME: remove hardcoded schema
    const { statusCode, contentType } = new Response({ schema });

    // set content type from response instance
    res.header('Content-Type', contentType);

    // send response body with statusCode from response instance
    res.status(statusCode).json(body);
  }

  /**
   * Wire up response middlewares
   * @param {Object} req - express request object
   * @param {Object} res - express response object
   * @param {Function} next - express next function
   */
  responseMiddleWares(req, res, next) {
    // define middleware functions used in response handlers
    res.sendJsonResponse = Controller.sendJsonResponse.bind(this, res);

    next();
  }
}
