import { mediaQueryMax, mediaQueryMin } from 'src/utils/style';

const deviceType = {
  small: 425,
  medium: 768,
  large: 1024,
};

export const screen = {
  small: mediaQueryMax(deviceType.small),
  medium: mediaQueryMax(deviceType.medium),
  large: mediaQueryMin(deviceType.large),
};

export const colors = {
  primary: '#2937f5',
  secondary: '#3300cc',
  gray200: '#ddd',
  gray300: '#d4d4d4',
  gray800: '#888',
  white: 'white',
  black: '#212121',
  error: 'red',
};

export const fontSize = {
  sm: '12px',
  m: '14px',
  lg: '16px',
  ml: '18px',
  xl: '24px',
};

export const fontWeight = {
  normal: '400',
  bold: '700',
};
