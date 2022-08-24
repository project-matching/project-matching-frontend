import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { ProjectType } from 'src/hooks/useInfiniteScroll';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';

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
  // const {items, setItems} = useInfiniteScroll({api: ProjectService.recruitingProject})

  useEffect(() => {
    (async () => {
      setRecruitingProject(await ProjectService.recruitingProject());
    })();
  }, [token]);

  return (
    <PrimaryLayout>
      <SecondaryProjectLayout
        title="모집 중인 프로젝트"
        projectDtoList={recruitingProject}
      />
    </PrimaryLayout>
  );
};

export default Recruiting;

export async function getStaticProps() {
  const recruitingProject = await ProjectService.recruitingProject();

  return {
    props: {
      initProjects: recruitingProject,
    },
  };
}
