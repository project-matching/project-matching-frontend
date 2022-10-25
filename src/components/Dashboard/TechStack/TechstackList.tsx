import { TechStackType } from 'src/redux/reducers/techstacks';
import { SubTitle } from '../DashboardCommon';
import TechStackItem from './TechStackItem';

interface Props {
  techstacks: TechStackType[];
}

const TechstackList = ({ techstacks }: Props) => {
  return (
    <div>
      <SubTitle>기술 스택</SubTitle>
      <div>
        {techstacks?.map(({ technicalStackName, technicalStackNo, image }) => (
          <TechStackItem
            key={technicalStackNo}
            techStackName={technicalStackName}
            techStackNo={technicalStackNo}
            image={image}
          />
        ))}
      </div>
    </div>
  );
};

export default TechstackList;
