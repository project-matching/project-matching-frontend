import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import MainProjects from '@/components/Projects/MainProjects';

const Home: React.FC = () => {
  return (
    <PrimaryLayout>
      <MainProjects title="Recruiting" />
      <MainProjects title="Recruited" />
    </PrimaryLayout>
  );
};

export default Home;
