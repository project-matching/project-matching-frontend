const LOCAL_STORAGE_TOKEN_KEY_NAME = 'project-matching';
const LOCAL_STORAGE_REFRESH_TOKEN_KEY_NAME = 'refresh';
const LOCAL_STORAGE_EXP_KEY_NAME = 'exp';

export class TokenService {
  public static get(): string {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME) || '';
  }

  public static set(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
  }

  public static remove(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  }
  public static getRefresh(): string {
    return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY_NAME) || '';
  }

  public static setRefresh(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY_NAME, token);
  }

  public static removeRefresh(): void {
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY_NAME);
  }
  public static getExp(): string {
    return localStorage.getItem(LOCAL_STORAGE_EXP_KEY_NAME) || '';
  }

  public static setExp(token: number): void {
    localStorage.setItem(LOCAL_STORAGE_EXP_KEY_NAME, token.toString());
  }

  public static removeExp(): void {
    localStorage.removeItem(LOCAL_STORAGE_EXP_KEY_NAME);
  }
}
