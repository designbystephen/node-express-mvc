import express from 'express';
import { forIn } from 'lodash/object';
import controllers from './controllers';

/**
 * Create express application
 * @returns {Object} express app
 */
export default () => {
  const app = express();

  // wire up each controller to app
  forIn(controllers, (controller) => {
    app.use(controller.router);
  });

  return app;
};
