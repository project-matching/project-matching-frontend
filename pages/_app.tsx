import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { wrapper } from 'redux/store';
import '../styles/globals.css';
import reset from '../styles/reset';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
