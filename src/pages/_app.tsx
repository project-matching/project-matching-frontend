import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { validateToken } from 'src/redux/reducers/auth';
import { store, wrapper } from 'src/redux/store';
import reset from '../styles/reset';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    // if (process.env.NODE_ENV == 'development') {
    //   const { worker } = require('../../mocks/browser');
    //   worker.start();
    // }

    if (localStorage !== undefined) {
      dispatch(validateToken());
    }
  }, [dispatch]);

  return (
    <>
      <Provider store={store}>
        <Global styles={reset} />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
