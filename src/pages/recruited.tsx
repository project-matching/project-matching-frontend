import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { data } from '.';

const Recruited = () => {
  return (
    <PrimaryLayout>
      <SecondaryProjectLayout
        title="모집 완료된 프로젝트"
        projectDtoList={data}
      />
    </PrimaryLayout>
  );
};

export default Recruited;
