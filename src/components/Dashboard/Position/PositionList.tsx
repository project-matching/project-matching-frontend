import PositionItem from '@/components/Dashboard/Position/PositionItem';
import styled from '@emotion/styled';
import { useAppSelector } from 'src/redux/hooks';

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const PositionList = () => {
  const positions = useAppSelector((state) => state.position.positions);

  return (
    <div>
      <Title>포지션 리스트</Title>
      {positions?.map(({ positionName, positionNo }) => (
        <PositionItem
          key={positionNo}
          positionName={positionName}
          positionNo={positionNo}
        />
      ))}
    </div>
  );
};

export default PositionList;
