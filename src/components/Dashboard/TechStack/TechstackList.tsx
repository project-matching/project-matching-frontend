import TechStackItem from '@/components/Dashboard/TechStack/TechStackItem';
import styled from '@emotion/styled';
import { useAppSelector } from 'src/redux/hooks';

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const TechstackList = () => {
  const techstacks = useAppSelector((state) => state.techStack.techstacks);

  return (
    <div>
      <Title>기술 스택 리스트</Title>
      {techstacks?.map(({ technicalStackName, technicalStackNo, image }) => (
        <TechStackItem
          key={technicalStackNo}
          techStackName={technicalStackName}
          techStackNo={technicalStackNo}
          image={image}
        />
      ))}
    </div>
  );
};

export default TechstackList;
