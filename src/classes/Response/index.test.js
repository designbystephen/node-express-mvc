/* globals describe test expect */
import Response from './index';
import DefaultError from '../../responses/DefaultError';

describe('Test Response Constructor and Class Methods', () => {
  test('Should create new instance of <Response>', () => {
    const myResponse = new Response({ schema: {} });
    expect(myResponse).toBeInstanceOf(Response);
  });

  test('Test OpenAPI Spec Export', () => {
    const myResponse = new Response({ schema: {} });
    const spec = myResponse.toOAS();

    // 1. Ensure that spec is able to be parsed by JSON.stringify
    expect(() => JSON.stringify(spec)).toBeDefined();

    // 2. Check required properties
    expect(spec).toHaveProperty('200');
    expect(spec).toHaveProperty('200.content');
    expect(spec).toHaveProperty('200.content.application/json');
    expect(spec).toHaveProperty('200.content.application/json.schema');

    // 3. Check for default error
    expect(spec).toHaveProperty('default');
    expect(spec.default).toMatchObject(DefaultError);
  });
});
