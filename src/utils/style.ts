/**
 * css 스타일에 사용되는 함수
 *
 * 1. 순수 함수만 사용해주세요.
 * 2. JSDoc으로 함수의 용도와 활용법을 적어주세요.
 */

/**
 * 경계선 정의
 */
export const borders = {
  basic: (color: string) => {
    `1px solid ${color}`;
  },
};

/**
 * 화면 미디어쿼리 반환 (최대 너비 기준)
 * @param screenSize
 * @returns {string}
 */
export const mediaQueryMax = (screenSize: number) =>
  `only screen and (max-width: ${screenSize}px)`;
/**
 * 화면 미디어쿼리 반환 (최소 너비 기준)
 * @param screenSize
 * @returns {string}
 */
export const mediaQueryMin = (screenSize: number) =>
  `only screen and (min-width: ${screenSize}px)`;
