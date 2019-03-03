import { isNil } from 'lodash/lang';

export default (...args) => {
  if (args.some(arg => isNil(arg))) {
    throw new SyntaxError('Missing required value(s)');
  }
};
