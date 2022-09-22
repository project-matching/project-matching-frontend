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

const Recruiting = ({ initProjects }: PropTypes) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [recruitingProject, setRecruitingProject] = useState(initProjects);

  useEffect(() => {
    try {
      (async () => {
        setRecruitingProject(await ProjectService.recruitingProject());
      })();
    } catch (error: any) {
      // TODO: 네트워크 상태를 확인해주세요.
    }
  }, [userInfo.no]);

  return (
    <PrimaryLayout>
      <InfiniteScrollLayout
        api={ProjectService.recruitingProject}
        data={recruitingProject}
        setData={setRecruitingProject}
      >
        <SecondaryProjectLayout
          title="모집 중인 프로젝트"
          projectDtoList={recruitingProject.content}
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
        initProjects: recruitingProject,
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
