import TechStackItem from '@/components/Dashboard/TechStack/TechStackItem';
import styled from '@emotion/styled';

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const data = [
  {
    image:
      'https://project-matching-s3.s3.ap-northeast-2.amazonaws.com/741e7a82-2018-4ed0-b1bf-c93cf253e4e2.jpg',
    technicalStackName: 'Spring',
    technicalStackNo: 0,
  },
  {
    image:
      'https://project-matching-s3.s3.ap-northeast-2.amazonaws.com/741e7a82-2018-4ed0-b1bf-c93cf253e4e2.jpg',
    technicalStackName: 'NextJS',
    technicalStackNo: 1,
  },
  {
    image:
      'https://project-matching-s3.s3.ap-northeast-2.amazonaws.com/741e7a82-2018-4ed0-b1bf-c93cf253e4e2.jpg',
    technicalStackName: 'React',
    technicalStackNo: 2,
  },
  {
    image:
      'https://project-matching-s3.s3.ap-northeast-2.amazonaws.com/741e7a82-2018-4ed0-b1bf-c93cf253e4e2.jpg',
    technicalStackName: 'TypeScript',
    technicalStackNo: 3,
  },
  {
    image:
      'https://project-matching-s3.s3.ap-northeast-2.amazonaws.com/741e7a82-2018-4ed0-b1bf-c93cf253e4e2.jpg',
    technicalStackName: 'NestJS',
    technicalStackNo: 4,
  },
];

const TechstackList = () => {
  return (
    <div>
      <Title>기술 스택 리스트</Title>
      {data.map(({ technicalStackName, technicalStackNo, image }) => (
        <TechStackItem
          key={technicalStackNo}
          techStackName={technicalStackName}
          image={image}
        />
      ))}
    </div>
  );
};

export default TechstackList;
