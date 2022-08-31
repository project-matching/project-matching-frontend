import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { Backdrop } from '../Modals/Backdrop';
import PositionApplyModal from '../Modals/PositionApplyModal';

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PositionItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin: 5px;
`;

const ApplyButton = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

interface UserDto {
  name: string;
  no: number;
  register: boolean;
}

interface PositionList {
  positionName: string,
  projectPositionNo: number,
  userDto: UserDto | null,
}

interface Props {
  positionList: PositionList[],
  projectName: string,
}

interface list {
  [positionName: string]: (UserDto | null)[],
}

const Position: FC<Props> = ({ positionList, projectName}) => {
  const token = useAppSelector(state => state.auth.token);
  const isClicked = useAppSelector(state => state.modal.PositionApplyModal);
  const [positions, setPositionList] = useState<list>({});
  const [appliedPosition, setAppliedPosition] = useState<string | null>(null);
  const [appliedPositionNo, setAppliedPositionNo] = useState<number | null>(null);
  const dispatch = useDispatch();

  const openApplyModal = (applyPosition: string) => {
    if (!token) return dispatch(openModal("AuthModal"));

    const position = positionList?.filter(position => position.positionName === applyPosition);

    dispatch(openModal('PositionApplyModal'));
    setAppliedPosition(applyPosition);
    setAppliedPositionNo(position[0].projectPositionNo)
  };

  useEffect(() => {
    const filteredPosition: list = {};

    positionList?.forEach((position) => {
      filteredPosition[position.positionName] ?
      filteredPosition[position.positionName].push(position.userDto) :
      filteredPosition[position.positionName] = [position.userDto];
    });

    setPositionList(filteredPosition);
  }, [positionList]);

  return (
    <>
      <PositionContainer>
        {Object.keys(positions).map((positionName) => {
          const totalApplicants = positions[positionName].length;
          const currentApplicants = positions[positionName].filter(userDto => userDto).length;
          const state = currentApplicants === totalApplicants;

          return (
            <PositionItem key={positionName}>
              <div>{positionName}</div>
              <div>{currentApplicants} / {totalApplicants}</div>
              <ApplyButton disabled={state} onClick={() => {openApplyModal(positionName)}}>{state ? "Done" : "Apply"}</ApplyButton>
            </PositionItem>
          )
        })}
      </PositionContainer>
      {isClicked && 
        (<Backdrop>
          <PositionApplyModal projectName={projectName} position={appliedPosition} positionNo={appliedPositionNo} />
        </Backdrop>)
      }
    </>
  );
};

export default Position;
