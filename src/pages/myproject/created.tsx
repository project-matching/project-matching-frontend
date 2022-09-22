import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyCreatedProject = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [createdProject, setCreatedProject] = useState<
    fetchedData<ProjectType>
  >({
    content: [],
    last: false,
  });

  useEffect(() => {
    try {
      userInfo.no &&
        (async () => {
          setCreatedProject(await ProjectService.createdProject());
        })();
    } catch (error: any) {
      // TODO: 네트워크 상태를 확인해주세요.
      // TODO: 로그인을 해주세요.
    }
  }, [userInfo.no]);

  return (
    <PrimaryLayout>
      {userInfo.no && (
        <InfiniteScrollLayout
          api={ProjectService.createdProject}
          data={createdProject}
          setData={setCreatedProject}
        >
          <SecondaryProjectLayout
            title="내가 만든 프로젝트"
            projectDtoList={createdProject.content}
          />
        </InfiniteScrollLayout>
      )}
    </PrimaryLayout>
  );
};

export default MyCreatedProject;
