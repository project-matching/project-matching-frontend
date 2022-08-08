import PrimaryProjectLayout from '@/components/Projects/PrimaryProjectLayout';
import MainSearchBar from '@/components/SearchBar/MainSearchBar';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';

const Home: React.FC = () => {
  return (
    <PrimaryLayout>
      <MainSearchBar />
      <PrimaryProjectLayout title="Recruiting" />
      <PrimaryProjectLayout title="Recruited" />
    </PrimaryLayout>
  );
};

export default Home;
