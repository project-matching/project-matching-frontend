import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { data } from '..';

const SearchResult = () => {
  return (
    <PrimaryLayout>
      <SecondaryProjectLayout title="검색 결과" projectDtoList={data} />
    </PrimaryLayout>
  );
};

export default SearchResult;
