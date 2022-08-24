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

const Recruited = ({ initProjects }: PropTypes) => {
  const token = useAppSelector((state) => state.auth.token);
  const [recruitedProjects, setRecruitedProject] = useState(initProjects);

  useEffect(() => {
    (async () => {
      setRecruitedProject(await ProjectService.recruitedProject());
    })();
  }, [token]);

  return (
    <PrimaryLayout>
      <SecondaryProjectLayout
        title="모집 완료된 프로젝트"
        projectDtoList={recruitedProjects}
      />
    </PrimaryLayout>
  );
};

export default Recruited;

export async function getStaticProps() {
  const recruitedProject = await ProjectService.recruitedProject();

  return {
    props: {
      initProjects: recruitedProject,
    },
  };
}
