import styled from '@emotion/styled';
import Image from 'next/image';
import { UserProfileType } from 'src/redux/reducers/users';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_IMAGE } from '../Headers/Profile';

const ImageContainer = styled.div`
  margin-bottom: 50px;
`;

const InfoTitle = styled.span`
  font-weight: bold;
`;

const InfoLi = styled.li<{ vertical: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  margin-bottom: 10px;
  ${(props) => (props.vertical ? `margin-top: 10px;` : ``)}
  &:last-child {
    margin-bottom: 0;
  }

  > span {
    margin-right: 10px;
    line-height: 1.7;
    vertical-align: center;

    &${InfoTitle} {
      ${(props) =>
        props.vertical ? `margin-bottom: 10px;` : `margin-right: 20px;`}
    }
  }
`;

const InfoContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

interface MyProfileProps {
  myProfile: UserProfileType;
}

const MyProfile = ({ myProfile }: MyProfileProps) => {
  const {
    email,
    github,
    image,
    name,
    position,
    selfIntroduction,
    sex,
    technicalStackList,
  } = myProfile;

  const userData = [
    {
      id: 0,
      name: '이메일',
      content: email,
      vertical: false,
    },
    {
      id: 1,
      name: '이름',
      content: name,
      vertical: false,
    },
    {
      id: 2,
      name: '성별',
      content: sex,
      vertical: false,
    },
    {
      id: 3,
      name: '포지션',
      content: position,
      vertical: false,
    },
    {
      id: 4,
      name: '기술 스택',
      content: technicalStackList,
      vertical: false,
    },
    {
      id: 5,
      name: '깃허브 링크',
      content: github,
      vertical: false,
    },
    {
      id: 6,
      name: '자기 소개',
      content: selfIntroduction,
      vertical: true,
    },
  ];

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitProfile}>
      <ImageContainer>
        <Image
          // src={image || DEFAULT_IMAGE}
          src={DEFAULT_IMAGE} // TODO: 서버 수정 후 변경
          alt="profile_image"
          width="50px"
          height="50px"
          style={{
            borderRadius: '50%',
          }}
        />
      </ImageContainer>
      <InfoContainer>
        {userData.map(({ id, name, content, vertical }) => {
          if (Array.isArray(content)) {
            return (
              <InfoLi key={id} vertical={vertical}>
                <InfoTitle>{name}</InfoTitle>
                {(content.length > 0 &&
                  content?.map((techStack) => (
                    <span key={uuidv4()}>{techStack}</span>
                  ))) || <span>없음</span>}
              </InfoLi>
            );
          }
          return (
            <InfoLi key={id} vertical={vertical}>
              <InfoTitle>{name}</InfoTitle>
              <span>{content || '없음'}</span>
            </InfoLi>
          );
        })}
      </InfoContainer>
    </form>
  );
};

export default MyProfile;
