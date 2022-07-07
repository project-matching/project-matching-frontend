import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, wrapper } from 'redux/store';
import '../styles/globals.css';
import reset from '../styles/reset';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
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
