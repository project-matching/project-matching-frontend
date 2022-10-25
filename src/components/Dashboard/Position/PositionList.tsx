import { PositionType } from 'src/services/PositionService';
import { SubTitle } from '../DashboardCommon';
import PositionItem from './PositionItem';

interface Props {
  positions: PositionType[];
}

const PositionList = ({ positions }: Props) => {
  return (
    <div>
      <SubTitle>포지션</SubTitle>
      <div>
        {positions?.map(({ positionName, positionNo }) => (
          <PositionItem
            key={positionNo}
            positionName={positionName}
            positionNo={positionNo}
          />
        ))}
      </div>
    </div>
  );
};

export default PositionList;
