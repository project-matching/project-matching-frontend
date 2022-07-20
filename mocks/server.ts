import { setupServer, SetupServerApi } from 'msw/node';
import { handlers } from './index';

export const server: SetupServerApi = setupServer(...handlers);
