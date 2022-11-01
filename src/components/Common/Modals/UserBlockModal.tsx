import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Common/Buttons/SecondaryButton';
import styled from '@emotion/styled';
import Image from 'next/image';
import defaultProfileImage from 'public/default_profile.png';
import { Dispatch, SetStateAction, useState } from 'react';
import { UserService } from 'src/services/UserService';
import LocalModalLayout from './LocalModalLayout';

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const BlockReason = styled.textarea`
  margin: 20px 0;
  padding: 5px 10px;
  width: 100%;
  height: 200px;
  border: 1px solid #d4d4d4;
`;

const ErrorMsg = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.sizes.sm};
`;

interface UserBlockModalProps {
  userNo: number;
  name: string;
  image: string | null;
  onClose: Dispatch<SetStateAction<boolean>>;
  onBlock: Dispatch<SetStateAction<boolean>>;
}

const UserBlockModal = ({
  userNo,
  name,
  image,
  onClose,
  onBlock,
}: UserBlockModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleCloseModal = () => {
    onClose(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        'block-reason': {
          value: string;
        };
      };

      const blockReason = target['block-reason'].value;
      await UserService.blockUser(userNo, { blockReason });
      onClose(false);
      onBlock((prev) => !prev);
    } catch (error: any) {
      setErrorMsg('차단에 실패하였습니다. 다시 시도해주세요.');
      console.log(new Error(error || 'UNKNWON_ERROR'));
    }
  };

  return (
    <LocalModalLayout onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <Title>유저 차단</Title>
        <UserInfo>
          <Image
            src={image || defaultProfileImage}
            alt={`${name}-profile`}
            width="40px"
            height="40px"
            style={{
              borderRadius: '50%',
            }}
          />
          <span>{name}</span>
        </UserInfo>
        <label htmlFor="block-reason">차단 사유* (200자)</label>
        <BlockReason name="block-reason" id="block-reason" maxLength={200} />
        <ButtonContainer>
          <PrimaryButton wFull type="submit">
            차단
          </PrimaryButton>
          <SecondaryButton wFull onClick={handleCloseModal}>
            취소
          </SecondaryButton>
        </ButtonContainer>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </form>
    </LocalModalLayout>
  );
};

export default UserBlockModal;
