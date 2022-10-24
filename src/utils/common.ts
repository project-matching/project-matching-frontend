/**
 * 컴포넌트 내에서 쓰이는 함수들
 * 1. 순수 함수만 추가해주세요.
 * 2. JSDoc으로 함수의 용도와 활용법을 적어주세요.
 */

import { LinksProps } from '@/components/Layouts/RoutingSidebar';

/**
 * 이미지 파일 input 요소의 id를 생성한다. (이미지 수정용 파일 input)
 * @param name
 * @returns {string} name + '-edit-image'
 */
export const setIdName = (name: string) => name.toLowerCase() + '-edit-image';

/**
 * 경로를 통해 경로 이름을 반환한다.
 * @param path
 * @param links
 * @returns {string} 경로 이름
 */
export const getPathTitle = (path: string, links: LinksProps[]) => {
  return links.find(({ href }) => href === path)?.title;
};
