import { configureStore, Store } from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

const makeStore = (_context: Context) => {
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<Store>(makeStore, { debug: true });
