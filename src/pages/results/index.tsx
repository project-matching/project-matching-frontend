import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';

const SearchResult = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [recruitingProjects, setRecruitingProject] = useState([]);
  const [recruitedProjects, setRecruitedProject] = useState([]);

  const router = useRouter();
  const searchKeyword = router.query.keyword as string;
  const projectState = router.query.state === 'true';

  useEffect(() => {
    if (projectState) {
      (async () => {
        setRecruitedProject(
          (await ProjectService.searchedRecruitedProject(searchKeyword)).content
        );
      })();
    } else {
      (async () => {
        setRecruitingProject(
          (await ProjectService.searchedRecruitingProject(searchKeyword))
            .content
        );
      })();
    }
  }, [projectState, searchKeyword]);

  return (
    <PrimaryLayout>
      {token && (
        <SecondaryProjectLayout
          title={`${
            projectState ? '모집 완료된' : '모집 중인'
          } "${searchKeyword}" 검색 결과`}
          projectDtoList={projectState ? recruitedProjects : recruitingProjects}
        />
      )}
    </PrimaryLayout>
  );
};

export default SearchResult;
