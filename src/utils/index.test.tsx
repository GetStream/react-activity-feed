import '@testing-library/jest-dom';
import Dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import moment from 'moment';

Dayjs.extend(relativeTime);

import { trimURL, sanitizeURL, inputValueFromEvent, userOrDefault, humanizeTimestamp } from './';
describe('utils', () => {
  describe('trimURL', () => {
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

  describe('sanitizeURL', () => {
    [
      { input: '', output: '' },
      { input: undefined, output: undefined },
      { input: 'data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk7PC9zY3JpcHQ+', output: undefined },
      { input: 'getstream.io', output: 'getstream.io' },
      { input: 'www.getstream.io', output: 'www.getstream.io' },
      { input: 'http://getstream.com', output: 'http://getstream.com' },
      { input: 'https://getstream.com', output: 'https://getstream.com' },
      { input: 'ftp://getstream.com', output: 'ftp://getstream.com' },
      { input: 'mail://getstream.com', output: undefined },
      { input: 'ws://getstream.com', output: undefined },
    ].forEach(({ input, output }) => {
      it(`matches the predefined output for ${input}`, () => {
        expect(sanitizeURL(input)).toEqual(output);
      });
    });
  });

  describe('inputValueFromEvent', () => {
    it('extract the correct value', () => {
      // @ts-expect-error
      expect(inputValueFromEvent({ target: { value: 'x' } })).toEqual('x');
      // @ts-expect-error
      expect(inputValueFromEvent({ currentTarget: { value: 'y' } })).toEqual('y');
      // @ts-expect-error
      expect(inputValueFromEvent({ target: {} })).toEqual(undefined);
    });
  });

  describe('userOrDefault', () => {
    const defaultUser = {
      id: '!not-found',
      created_at: '',
      updated_at: '',
      data: { name: 'Unknown', profileImage: '' },
    };

    it('should return default data for invalid user', () => {
      expect(userOrDefault()).toEqual(defaultUser);
      expect(userOrDefault(null)).toEqual(defaultUser);
      expect(userOrDefault('')).toEqual(defaultUser);
      expect(userOrDefault('id')).toEqual(defaultUser);
      expect(userOrDefault({ error: 'deleted user' })).toEqual(defaultUser);
    });

    it('should return the valid user as is', () => {
      const user = { id: 'id', created_at: '', updated_at: '', data: { name: '' } };
      expect(userOrDefault(user)).toEqual(user);
    });
  });

  describe('humanizeTimestamp', () => {
    it('correct toISOString timestamp', () => {
      const now = new Date().toISOString();
      expect(humanizeTimestamp(now, Dayjs)).toEqual('a few seconds ago');
      expect(humanizeTimestamp(now, moment)).toEqual('a few seconds ago');
    });

    it('toISOString timestamp with Z', () => {
      const now = new Date().toISOString();
      expect(humanizeTimestamp(now.substring(0, now.length - 2), Dayjs)).toEqual('a few seconds ago');
      expect(humanizeTimestamp(now.substring(0, now.length - 2), moment)).toEqual('a few seconds ago');
    });
  });
});
