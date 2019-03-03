import getComponentRef from '../helpers/getComponentRef';

export default {
  description: 'Unexpected error',
  content: {
    'application/json': {
      schema: {
        $ref: getComponentRef({ name: 'Error' }),
      },
    },
  },
};
