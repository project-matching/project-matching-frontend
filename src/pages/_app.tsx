import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { updateUserInfo } from 'src/redux/reducers/users';
import { store, wrapper } from 'src/redux/store';
import reset from '../styles/reset';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage !== undefined) {
      dispatch(updateUserInfo());
    }
  }, [dispatch]);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Global styles={reset} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
