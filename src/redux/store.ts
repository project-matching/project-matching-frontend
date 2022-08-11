import { configureStore } from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';
import { Store } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware, { Task } from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger] as const,
  devTools: process.env.NODE_ENV !== 'production',
});

const makeStore = (_context: Context) => {
  sagaMiddleware.run(rootSaga);

  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<Store>(makeStore, { debug: true });
