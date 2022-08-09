import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { data } from '.';

const Recruiting = () => {
  return (
    <PrimaryLayout>
      <SecondaryProjectLayout
        title="모집 중인 프로젝트"
        projectDtoList={data}
      />
    </PrimaryLayout>
  );
};

export default Recruiting;
