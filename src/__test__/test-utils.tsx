import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import { theme } from 'src/styles/theme';

interface ReactProps {
  children?: NonNullable<ReactNode>;
}

const AllTheProviders: React.FC<ReactProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
