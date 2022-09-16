import { TokenType } from './redux/reducers/auth';

declare global {
  // eslint-disable-next-line
  interface Window {
    parentCallback: (_tokens: TokenType) => void;
  }
}
