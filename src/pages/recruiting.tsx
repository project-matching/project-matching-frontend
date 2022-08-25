import InfiniteScrollLayout from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

/**
 * TODOS:
 * 무한 스크롤 구현
 */

interface PropTypes {
  initProjects: ProjectType[];
}

const Recruiting = ({ initProjects }: PropTypes) => {
  const token = useAppSelector((state) => state.auth.token);
  const [recruitingProject, setRecruitingProject] = useState(initProjects);

  useEffect(() => {
    token &&
      (async () => {
        setRecruitingProject(
          (await ProjectService.recruitingProject()).content
        );
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      <InfiniteScrollLayout
        api={ProjectService.recruitingProject}
        items={recruitingProject}
        setItems={setRecruitingProject}
      >
        <SecondaryProjectLayout
          title="모집 중인 프로젝트"
          projectDtoList={recruitingProject}
        />
      </InfiniteScrollLayout>
    </PrimaryLayout>
  );
};

export default Recruiting;

export async function getStaticProps() {
  try {
    const recruitingProject = await ProjectService.recruitingProject();

    return {
      props: {
        initProjects: recruitingProject.content,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        initProjects: [],
      },
    };
  }
}
