import SmallButton from '@/components/Common/Buttons/SmallButton';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { Backdrop } from '../Common/Modals/Backdrop';
import PositionApplyModal from '../Common/Modals/PositionApplyModal';

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PositionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  margin: 5px;

  button {
    margin: 0;
    font-size: ${(props) => props.theme.sizes.sm};
  }
`;

interface UserDto {
  name: string;
  no: number;
  register: boolean;
}

interface PositionList {
  positionName: string;
  projectPositionNo: number;
  userDto: UserDto | null;
}

interface Props {
  positionList: PositionList[];
  projectName: string;
  isRegister: boolean;
  isParticipant: boolean;
  isApplicant: boolean;
}

interface list {
  [positionName: string]: (UserDto | null)[];
}

const Position: FC<Props> = ({
  positionList,
  projectName,
  isRegister,
  isParticipant,
  isApplicant,
}) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isClicked = useAppSelector((state) => state.modal.PositionApplyModal);
  const [positions, setPositionList] = useState<list>({});
  const [appliedPosition, setAppliedPosition] = useState<string | null>(null);
  const [appliedPositionNo, setAppliedPositionNo] = useState<number | null>(
    null
  );
  const dispatch = useDispatch();

  const openApplyModal = (applyPosition: string) => {
    if (!userInfo.no) return dispatch(openModal('AuthModal'));

    const position = positionList?.filter(
      (position) => position.positionName === applyPosition && !position.userDto
    );

    dispatch(openModal('PositionApplyModal'));
    setAppliedPosition(applyPosition);
    setAppliedPositionNo(position[0].projectPositionNo);
  };

  useEffect(() => {
    const filteredPosition: list = {};

    positionList?.forEach((position) => {
      filteredPosition[position.positionName]
        ? filteredPosition[position.positionName].push(position.userDto)
        : (filteredPosition[position.positionName] = [position.userDto]);
    });

    setPositionList(filteredPosition);
  }, [positionList]);

  return (
    <>
      <PositionContainer>
        {Object.keys(positions).map((positionName) => {
          const totalApplicants = positions[positionName].length;
          const currentApplicants = positions[positionName].filter(
            (userDto) => userDto
          ).length;
          const state = currentApplicants === totalApplicants;

          return (
            <PositionItem key={positionName}>
              <div>{positionName}</div>
              <div>
                {currentApplicants} / {totalApplicants}
              </div>
              {!isParticipant && !isRegister && (
                <SmallButton
                  disabled={state}
                  onClick={() => {
                    openApplyModal(positionName);
                  }}
                >
                  {state || isApplicant ? '모집완료' : '지원하기'}
                </SmallButton>
              )}
            </PositionItem>
          );
        })}
      </PositionContainer>
      {isClicked && (
        <Backdrop>
          <PositionApplyModal
            projectName={projectName}
            position={appliedPosition}
            positionNo={appliedPositionNo}
          />
        </Backdrop>
      )}
    </>
  );
};

export default Position;
