// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { server } from '@/mocks/server';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

jest.mock('@fortawesome/fontawesome-svg-core/import.macro', () => ({
  solid() {},
  regular() {},
}));

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
