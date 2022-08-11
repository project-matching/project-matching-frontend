import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { recruitedProject } from 'src/redux/reducers/projects/recruitedProjects';
import { recruitingProject } from 'src/redux/reducers/projects/recruitingProjects';

const SearchResult = () => {
  const router = useRouter();
  const recruitedProjects = useAppSelector(
    (state) => state.recruitedProjects.projectList
  );
  const recruitingProjects = useAppSelector(
    (state) => state.recruitingProjects.projectList
  );
  const dispatch = useDispatch();
  const searchKeyword = router.query.keyword as string;
  const projectState = router.query.state === 'true';

  useEffect(() => {
    if (projectState) {
      dispatch(recruitedProject({ page: 0, searchContent: searchKeyword }));
    } else {
      dispatch(recruitingProject({ page: 0, searchContent: searchKeyword }));
    }
  }, [projectState, dispatch, searchKeyword]);

  return (
    <PrimaryLayout>
      <SecondaryProjectLayout
        title={`${
          projectState ? '모집 완료된' : '모집 중인'
        } "${searchKeyword}" 검색 결과`}
        projectDtoList={projectState ? recruitedProjects : recruitingProjects}
      />
    </PrimaryLayout>
  );
};

export default SearchResult;
