import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { DEFAULT_IMAGE } from '@/components/Headers/Profile';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useState } from 'react';

const Card = styled.div`
  margin: 20px 0;
  width: 100%;
  padding: 20px 40px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.sizes.lg};
  border: 1px solid ${(props) => props.theme.colors.darkGray};
`;

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserInfo = styled.div`
  margin: 20px 0 0 30px;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;

    > span:first-of-type {
      font-weight: bold;
      margin-right: 30px;
    }
  }
`;

const UserBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
`;

interface PropType {
  userInfo: {
    email: string;
    image: string | null;
    name: string;
  };
}

const UserCard = ({ userInfo }: PropType) => {
  const { email, image, name } = userInfo;
  const [isBlock, setBlock] = useState(false); // TODO: 추후 기본값 변경

  return (
    <Card>
      <UserContainer>
        <Image
          src={image || DEFAULT_IMAGE}
          alt="user_image"
          width="60px"
          height="60px"
          style={{
            borderRadius: '50%',
          }}
        />
        <UserInfo>
          <div>
            <span>이름</span>
            <span>{name}</span>
          </div>
          <div>
            <span>이메일</span>
            <span>{email}</span>
          </div>
        </UserInfo>
      </UserContainer>
      <UserBlock>
        <PrimaryButton>{isBlock ? '차단 해제' : '차단'}</PrimaryButton>
      </UserBlock>
    </Card>
  );
};

export default UserCard;
