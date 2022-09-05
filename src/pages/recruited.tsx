import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

interface PropTypes {
  initProjects: fetchedData<ProjectType>;
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
      <InfiniteScrollLayout
        api={ProjectService.recruitedProject}
        data={recruitedProjects}
        setData={setRecruitedProject}
      >
        <SecondaryProjectLayout
          title="모집 완료된 프로젝트"
          projectDtoList={recruitedProjects.content}
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
        initProjects: recruitedProject,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        initProjects: {
          content: [],
          last: false,
        },
      },
    };
  }
}
