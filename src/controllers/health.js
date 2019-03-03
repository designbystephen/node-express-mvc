import Controller from '../classes/Controller';

const health = new Controller();

health.get('/health', (req, res) => {
  res.sendJsonResponse({
    status: 'ok',
  });
});

export default health;
