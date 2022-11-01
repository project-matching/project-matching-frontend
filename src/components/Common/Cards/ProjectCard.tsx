import styled from '@emotion/styled';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/router';
import defaultProfileImage from 'public/default_profile.png';
import { RefObject, useRef } from 'react';
import useBookmark from 'src/hooks/useBookmark';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectType } from 'src/services/ProjectService';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  projectDto: ProjectType;
  size: CardSizeType;
  bookmarkOnly?: boolean;
}

const ProjectCard = ({ projectDto, bookmarkOnly = false, size }: Props) => {
  const {
    projectNo,
    currentPeople,
    maxPeople,
    name,
    projectSimplePositionDtoList,
    projectSimpleTechnicalStackDtoList,
    viewCount,
    register,
    bookMark: initBookmark,
  } = projectDto;
  const { role } = useAppSelector((state) => state.user.userInfo);
  const { bookmark, toggleBookmark } = useBookmark({
    initBookmark,
  });
  const bookmarkRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if (bookmarkRef?.current?.contains(e.target as Element)) return;
    router.push(`/project/${projectNo}`);
  };

  const cardInfo = {
    bookmark,
    role,
    projectNo,
    currentPeople,
    maxPeople,
    name,
    positionList: removeDulplicatePosition(projectSimplePositionDtoList),
    techsTackList: projectSimpleTechnicalStackDtoList,
    viewCount,
    register,
  };

  return (
    <>
      {!bookmarkOnly ? (
        <ProjectCardView
          cardSize={size}
          toggleBookmark={toggleBookmark}
          handleCardClick={handleCardClick}
          bookmarkRef={bookmarkRef}
          cardInfo={cardInfo}
        />
      ) : (
        bookmark && (
          <ProjectCardView
            cardSize={size}
            toggleBookmark={toggleBookmark}
            handleCardClick={handleCardClick}
            bookmarkRef={bookmarkRef}
            cardInfo={cardInfo}
          />
        )
      )}
    </>
  );
};

export default ProjectCard;

/**
 * 중복되는 포지션 이름 제거
 * @param duplicateList
 * @returns
 */
const removeDulplicatePosition = (
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

// View
type CardSizeType = 'large' | 'medium' | 'small';

interface CardInfoType {
  bookmark: boolean;
  role: string | null;
  projectNo: number;
  currentPeople: number;
  maxPeople: number;
  name: string;
  positionList: {
    positionNo: number;
    positionName: string;
  }[];
  techsTackList: {
    image: string;
    projectNo: number;
    technicalStackName: string;
  }[];
  viewCount: number;
  register: string;
}

interface ViewProps {
  cardSize: CardSizeType;
  toggleBookmark: (_projectNo: number) => Promise<void>;
  handleCardClick: (_e: React.MouseEvent) => void;
  bookmarkRef: RefObject<HTMLElement>;
  cardInfo: CardInfoType;
}

const ProjectCardView = ({
  cardSize,
  toggleBookmark,
  handleCardClick,
  bookmarkRef,
  cardInfo,
}: ViewProps) => {
  const CardContainer = styled.div<{ size: 'large' | 'medium' | 'small' }>`
    margin: 10px 0;
    height: 290px;

    ${(props) =>
      props.size === 'small'
        ? null
        : props.size === 'medium'
        ? `
        width: 204px;
        `
        : null}

    border: 1px solid #d4d4d4;
    border-radius: 3px;
    padding: 20px;
    cursor: pointer;
  `;

  const {
    bookmark,
    role,
    projectNo,
    currentPeople,
    maxPeople,
    name,
    positionList,
    techsTackList,
    viewCount,
    register,
  } = cardInfo;

  return (
    <CardContainer size={cardSize} onClick={handleCardClick}>
      <Head>
        <Top>
          <Author>{register}</Author>
          <div>
            {role !== 'ROLE_ADMIN' && (
              <i
                ref={bookmarkRef}
                onClick={async () => await toggleBookmark(projectNo)}
              >
                {bookmark ? (
                  <FontAwesomeIcon icon={solid('bookmark')} />
                ) : (
                  <FontAwesomeIcon icon={regular('bookmark')} />
                )}
              </i>
            )}
          </div>
        </Top>
        <H3>{name}</H3>
      </Head>
      <Req>
        <IconWrapper>
          {techsTackList?.map((techStackDto) => (
            <div key={uuidv4()}>
              <Image
                src={techStackDto.image || defaultProfileImage}
                alt={techStackDto.technicalStackName}
                width="30px"
                height="30px"
                style={{
                  borderRadius: '50%',
                }}
              />
            </div>
          ))}
        </IconWrapper>
      </Req>
      <Req>
        <ReqTitle>남은 포지션 {'>'} </ReqTitle>
        {positionList.slice(0, 2).map((positionDto) => (
          <span key={positionDto.positionNo}>{positionDto.positionName}</span>
        ))}
        {positionList.length > 2 && <span>...</span>}
        <HoverBox>
          {positionList.map((positionDto) => (
            <span key={positionDto.positionNo}>{positionDto.positionName}</span>
          ))}
        </HoverBox>
      </Req>
      <Req>
        <span>프로젝트 인원: {currentPeople + '/' + maxPeople}</span>
      </Req>
      <View>
        <i>
          <FontAwesomeIcon icon={solid('eye')} />
        </i>
        <span>{viewCount}</span>
      </View>
    </CardContainer>
  );
};

const Head = styled.div`
  margin-bottom: 20px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  > div {
    min-width: 16px;
  }
`;

const Author = styled.span`
  inline-size: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  font-size: ${(props) => props.theme.sizes.sm};
`;

const H3 = styled.div`
  font-size: ${(props) => props.theme.sizes.lg};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.2;
  height: 60px;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  > div {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const HoverBox = styled.div`
  visibility: hidden;
  position: absolute;
  top: 20px;
  right: -5px;
  width: 100px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  z-index: 3;

  span {
    line-height: 1.5;
  }
`;

const ReqTitle = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  line-height: 1.5;
`;

const Req = styled.div`
  position: relative;
  margin-bottom: 20px;
  font-size: ${(props) => props.theme.sizes.sm};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
    font-size: ${(props) => props.theme.sizes.sm};
  }

  &:hover {
    > ${HoverBox} {
      visibility: visible;
      background-color: white;
    }
  }
`;

const View = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  > i {
    margin-right: 5px;
  }

  > span,
  > i {
    font-size: ${(props) => props.theme.sizes.sm};
  }
`;
