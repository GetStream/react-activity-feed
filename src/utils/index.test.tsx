import '@testing-library/jest-dom';

import { trimURL } from './';

describe('utils -> trimURL', () => {
  [
    // eslint-disable-next-line sonarjs/no-duplicate-string
    { input: 'getstream.com', output: 'getstream.com' },
    { input: 'www.getstream.com', output: 'getstream.com' },
    { input: 'getstream.io/?nice=y', output: 'getstream.io' },
    { input: 'www.getstream.co.uk', output: 'getstream.co.uk' },
    { input: 'www.getstream.io/ro/', output: 'getstream.io' },
    { input: 'www.getstream.io:45/r', output: 'getstream.io:45' },
    { input: 'https://getstream.com', output: 'getstream.com' },
    { input: 'https://getstream.com/', output: 'getstream.com' },
    { input: 'https://www.getstream.com', output: 'getstream.com' },
    { input: 'http://getstream.com', output: 'getstream.com' },
    { input: 'https://www.goog?le.com', output: 'goog?le.com' },
    {
      input: 'https://www.google.ca/maps/@43.472082,-80.5426668,18z?hl=en',
      output: 'google.ca',
    },
    { input: undefined, output: undefined },
  ].forEach(({ input, output }) => {
    it(`matches the predefined output for ${input}`, () => {
      expect(trimURL(input)).toEqual(output);
    });
  });
});
