import PositionItem from '@/components/Dashboard/Position/PositionItem';
import styled from '@emotion/styled';

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const data = [
  {
    positionName: 'PM',
    positionNo: 0,
  },
  {
    positionName: 'FRONTEND',
    positionNo: 1,
  },
  {
    positionName: 'BACKEND',
    positionNo: 2,
  },
  {
    positionName: 'DESIGNER',
    positionNo: 3,
  },
  {
    positionName: 'DevOps',
    positionNo: 4,
  },
];

/**
 * TODO:
 * user role 확인 후 position 데이터 불러오기
 */

const PositionList = () => {
  return (
    <div>
      <Title>포지션 리스트</Title>
      {data.map(({ positionName, positionNo }) => (
        <PositionItem key={positionNo} positionName={positionName} />
      ))}
    </div>
  );
};

export default PositionList;
