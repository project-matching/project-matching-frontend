import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const SearchResult = () => {
  const [recruitingProjects, setRecruitingProject] = useState<
    fetchedData<ProjectType>
  >({ content: [], last: false });
  const [recruitedProjects, setRecruitedProject] = useState<
    fetchedData<ProjectType>
  >({ content: [], last: false });

  const router = useRouter();
  const searchKeyword = router.query.keyword as string;
  const projectState = router.query.state === 'true';

  useEffect(() => {
    if (projectState && searchKeyword) {
      (async () => {
        setRecruitedProject(
          await ProjectService.searchedRecruitedProject(searchKeyword)
        );
      })();
    } else if (!projectState && searchKeyword) {
      (async () => {
        setRecruitingProject(
          await ProjectService.searchedRecruitingProject(searchKeyword)
        );
      })();
    }
  }, [projectState, searchKeyword]);

  return (
    <PrimaryLayout>
      <InfiniteScrollLayout
        api={ProjectService.appliedProject}
        data={projectState ? recruitedProjects : recruitingProjects}
        setData={projectState ? setRecruitedProject : setRecruitingProject}
      >
        <SecondaryProjectLayout
          title={`${
            projectState ? '모집 완료된' : '모집 중인'
          } "${searchKeyword}" 검색 결과`}
          projectDtoList={
            projectState
              ? recruitedProjects.content
              : recruitingProjects.content
          }
        />
      </InfiniteScrollLayout>
    </PrimaryLayout>
  );
};

export default SearchResult;
