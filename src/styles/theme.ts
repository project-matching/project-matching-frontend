import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      gray: string;
      error: string;
    };
    sizes: {
      sm: string;
      m: string;
      lg: string;
      xl: string;
    };
    mq: typeof device;
  }
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const device = {
  mobileS: `only screen and (max-width: ${size.mobileS})`,
  mobileM: `only screen and (max-width: ${size.mobileM})`,
  mobileL: `only screen and (max-width: ${size.mobileL})`,
  tablet: `only screen and (max-width: ${size.tablet})`,
  laptop: `only screen and (max-width: ${size.laptop})`,
  laptopL: `only screen and (max-width: ${size.laptopL})`,
  desktop: `only screen and (max-width: ${size.desktop})`,
  desktopL: `only screen and (max-width: ${size.desktop})`,
};

export const theme: Theme = {
  colors: {
    primary: '#2937f5',
    secondary: '#3300cc',
    gray: '#d4d4d4',
    error: 'red',
  },
  sizes: {
    sm: '12px',
    m: '14px',
    lg: '16px',
    xl: '24px',
  },
  mq: device,
};
