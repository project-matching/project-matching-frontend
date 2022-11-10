import { links } from '@/components/Common/Layouts/DashboardLayout';
import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useAppSelector } from 'src/redux/hooks';

const Dashboard = () => {
  const { role } = useAppSelector((state) => state.user.userInfo);

  const router = useRouter();
  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <PrimaryLayout>
      {role === 'ROLE_ADMIN' && (
        <>
          <Title>Dashboard</Title>
          <CardContainer>
            {links.map(({ id, href, title }) => (
              <Card key={id} onClick={() => handleClick(href)}>
                {title}
              </Card>
            ))}
          </CardContainer>
        </>
      )}
    </PrimaryLayout>
  );
};

export default Dashboard;

const CardContainer = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const Title = styled.h1`
  margin: 40px 0;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.xl};
`;

const Card = styled.div`
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.gray300};
  cursor: pointer;
  transition: 0.2s ease-in;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;
