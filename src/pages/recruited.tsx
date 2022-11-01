import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Common/Layouts/InfiniteScrollLayout';
import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import SecondaryProjectLayout from '@/components/Common/Layouts/SecondaryProjectLayout';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

interface PropTypes {
  initProjects: fetchedData<ProjectType>;
}

const Recruited = ({ initProjects }: PropTypes) => {
  const initMount = useRef(true);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [recruitedProjects, setRecruitedProject] = useState(initProjects);

  useEffect(() => {
    if (initMount.current) {
      initMount.current = false;
    } else {
      try {
        (async () => {
          setRecruitedProject(await ProjectService.recruitedProject());
        })();
      } catch (error: any) {
        // TODO: 네트워크 상태를 확인해주세요.
      }
    }
  }, [userInfo.no]);

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
