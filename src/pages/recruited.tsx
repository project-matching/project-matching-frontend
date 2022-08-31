import InfiniteScrollLayout from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

interface PropTypes {
  initProjects: ProjectType[];
}

const Recruited = ({ initProjects }: PropTypes) => {
  const token = useAppSelector((state) => state.auth.token);
  const [recruitedProjects, setRecruitedProject] = useState(initProjects);

  useEffect(() => {
    token &&
      (async () => {
        setRecruitedProject((await ProjectService.recruitedProject()).content);
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      <InfiniteScrollLayout
        api={ProjectService.recruitedProject}
        items={recruitedProjects}
        setItems={setRecruitedProject}
      >
        <SecondaryProjectLayout
          title="모집 완료된 프로젝트"
          projectDtoList={recruitedProjects}
        />
      </InfiniteScrollLayout>
    </PrimaryLayout>
  );
};

export default Recruited;

export async function getStaticProps() {
  try {
    const recruitedProject = await ProjectService.recruitedProject();

    return {
      props: {
        initProjects: recruitedProject.content,
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
