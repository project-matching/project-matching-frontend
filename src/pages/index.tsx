import MainSearchBar from '@/components/SearchBar/MainSearchBar';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import MainProjects from 'src/components/Projects/MainProjects';

const Home: React.FC = () => {
  return (
    <PrimaryLayout>
      <MainSearchBar />
      <MainProjects title="Recruiting" />
      <MainProjects title="Recruited" />
    </PrimaryLayout>
  );
};

export default Home;
