import PrimaryButton from '@/components/Common/Buttons//PrimaryButton';
import UserBlockModal from '@/components/Common/Modals/UserBlockModal';
import styled from '@emotion/styled';
import Image from 'next/image';
import defaultProfileImage from 'public/default_profile.png';
import { useState } from 'react';
import { UserListType } from 'src/redux/reducers/users';
import { UserService } from 'src/services/UserService';

interface PropType {
  userInfo: UserListType;
}

const UserCard = ({ userInfo }: PropType) => {
  const { email, image, name, block: initBlock, userNo } = userInfo;
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(initBlock);

  const blockUser = async () => {
    setOpen(true);
  };

  const unblockUser = async () => {
    try {
      await UserService.unblockUser(userNo);
      setBlock((prev) => !prev);
    } catch (error: any) {
      console.log(new Error(error?.response?.data?.error || 'UNKNWON_ERROR'));
      alert('차단 해제에 실패하였습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <Card>
      <UserContainer>
        <ImageContainer>
          <Image
            src={image || defaultProfileImage}
            alt="user_image"
            width="60px"
            height="60px"
            style={{
              borderRadius: '50%',
            }}
          />
        </ImageContainer>
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
        <PrimaryButton onClick={block ? unblockUser : blockUser}>
          {block ? '차단 해제' : '차단'}
        </PrimaryButton>
      </UserBlock>
      {open && (
        <UserBlockModal
          userNo={userNo}
          name={name}
          image={image}
          onClose={setOpen}
          onBlock={setBlock}
        />
      )}
    </Card>
  );
};

export default UserCard;

const Card = styled.div`
  margin: 20px 0;
  width: 100%;
  padding: 40px 40px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.sizes.lg};
  border: 1px solid ${(props) => props.theme.colors.darkGray};
`;

const UserContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 6fr;
  gap: 30px;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 60px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;

    > span {
      overflow: hidden;
      overflow-wrap: break-word;
      line-height: 1.5;

      &:first-of-type {
        font-weight: bold;
        width: 70px;
      }
    }
  }
`;

const UserBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
`;
