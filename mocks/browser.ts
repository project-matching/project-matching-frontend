import { handlers } from 'mocks';
import { setupWorker, SetupWorkerApi } from 'msw';

export const worker: SetupWorkerApi = setupWorker(...handlers);
