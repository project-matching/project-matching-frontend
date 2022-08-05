import styled from '@emotion/styled';
import ProjectList from './ProjectList';

interface SecondaryProjectLayoutProps {
  title: string;
}

const SecondaryProjectLayout = ({ title }: SecondaryProjectLayoutProps) => {
  const Title = styled.h2`
    margin: 30px 0;
    font-size: ${(props) => props.theme.sizes.xl};
    font-weight: bold;
  `;
  return (
    <>
      <Title>{title}</Title>
      <ProjectList />
    </>
  );
};

export default SecondaryProjectLayout;
