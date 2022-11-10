/**
 * 컴포넌트 내에서 쓰이는 함수들
 * 1. 순수 함수만 추가해주세요.
 * 2. JSDoc으로 함수의 용도와 활용법을 적어주세요.
 */

import { LinksProps } from '@/components/Common/Layouts/RoutingSidebar';
import { PositionService } from 'src/services/PositionService';
import { ProjectType } from 'src/services/ProjectService';
import { TechStackService } from 'src/services/TechStackService';

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

/**
 * 문자열을 정규표현식 객체로 바꿔 반환한다.
 * @param pattern
 * @returns {RegExp}
 */
export const convertToRegEx = (pattern: string): RegExp => RegExp(pattern);

/**
 * 중복되는 프로젝트 포지션 이름 제거
 * @param duplicateList
 * @returns
 */
export const removeDulplicatePosition = (
  duplicateList: ProjectType['projectSimplePositionDtoList']
) => {
  if (!duplicateList.length) return [];

  const unique: { [id: number]: string } = {};

  duplicateList.forEach(
    ({ positionNo, positionName }) =>
      (unique[positionNo] = unique[positionNo] || positionName)
  );

  return Object.keys(unique).map((key) => ({
    positionNo: +key,
    positionName: unique[+key],
  }));
};

/**
 * 선택된 아이템들을 아이템 리스트에서 제거
 * @param items
 * @param selectedItems
 * @returns {string[]}
 */
export const filterSelectedItems = (items: string[], selectedItems: string[]) =>
  items.filter((item) => !selectedItems.includes(item));

/**
 * 서버 성별 표기를 한국어로 변경
 * @param initSex
 * @returns
 */
export const decodeSex = (initSex: string) => {
  return initSex === 'M' ? '남' : initSex === 'W' ? '여' : '없음';
};

/**
 * 한국어 성별 표기를 서버 표기법으로 변경
 * @param sex
 * @returns
 */
export const encodeSex = (sex: string) => {
  return sex && sex === '남' ? 'M' : sex === '여' ? 'W' : 'N';
};

interface PositionDtoType {
  positionName: string;
  positionNo: number;
}

/**
 * 포지션 DTO 리스트에서 포지션 이름만 추출하여 리스트로 반환
 * @param positions
 * @returns
 */
export const getPositionNameOnly = (positions: PositionDtoType[]) =>
  positions.map(({ positionName }) => positionName);

/**
 * 드롭다운에 사용하는 포지션 옵션 리스트 반환
 * @returns
 */
export const getDefaultPositionOptions = async () => {
  const fetchedDefaultPositions: PositionDtoType[] =
    await PositionService.getPositions();
  const defaultPositionList = getPositionNameOnly(fetchedDefaultPositions);
  return ['없음', ...defaultPositionList];
};

interface TechnicalStackDtoType {
  technicalStackName: string;
  technicalStackNo: number;
  image: string;
}

/**
 * 기술스택 DTO 리스트에서 기술스택 이름만 추출하여 리스트로 반환
 * @param techStacks
 * @returns
 */
export const getTeckStackNameOnly = (techStacks: TechnicalStackDtoType[]) =>
  techStacks.map(({ technicalStackName }) => technicalStackName);

/**
 * 드롭다운에 사용하는 기술스택 옵션 리스트 반환
 * @returns
 */
export const getDefaultTechStackOptions = async () => {
  const fetchedDefaultTechStacks: TechnicalStackDtoType[] =
    await TechStackService.getTechStacks();
  return getTeckStackNameOnly(fetchedDefaultTechStacks);
};
