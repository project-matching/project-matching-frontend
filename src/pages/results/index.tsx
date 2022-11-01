import { fetchedData } from '@/components/Common/Layouts/InfiniteScrollLayout';
import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import SearchInfiniteScrollLayout from '@/components/Common/Layouts/SearchInfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Common/Layouts/SecondaryProjectLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
      <SearchInfiniteScrollLayout
        api={
          projectState
            ? ProjectService.searchedRecruitedProject
            : ProjectService.searchedRecruitingProject
        }
        data={projectState ? recruitedProjects : recruitingProjects}
        setData={projectState ? setRecruitedProject : setRecruitingProject}
        content={searchKeyword}
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
      </SearchInfiniteScrollLayout>
    </PrimaryLayout>
  );
};

export default SearchResult;
