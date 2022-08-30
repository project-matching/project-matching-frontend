import InfiniteScrollLayout from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const SearchResult = () => {
  const [recruitingProjects, setRecruitingProject] = useState<ProjectType[]>(
    []
  );
  const [recruitedProjects, setRecruitedProject] = useState<ProjectType[]>([]);

  const router = useRouter();
  const searchKeyword = router.query.keyword as string;
  const projectState = router.query.state === 'true';

  useEffect(() => {
    if (projectState && searchKeyword) {
      (async () => {
        setRecruitedProject(
          (await ProjectService.searchedRecruitedProject(searchKeyword)).content
        );
      })();
    } else if (!projectState && searchKeyword) {
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
      <InfiniteScrollLayout
        api={ProjectService.appliedProject}
        items={projectState ? recruitedProjects : recruitingProjects}
        setItems={projectState ? setRecruitedProject : setRecruitingProject}
      >
        <SecondaryProjectLayout
          title={`${
            projectState ? '모집 완료된' : '모집 중인'
          } "${searchKeyword}" 검색 결과`}
          projectDtoList={projectState ? recruitedProjects : recruitingProjects}
        />
      </InfiniteScrollLayout>
    </PrimaryLayout>
  );
};

export default SearchResult;
