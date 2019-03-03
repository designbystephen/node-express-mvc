import app from './app';

// create new app
const server = app();

// Listen for requests
server.listen(5000, () => {
  /* eslint-disable no-console */
  console.log('Now listening at http://localhost:5000');
});
