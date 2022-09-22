import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyJoinedProject = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [joinedProject, setJoinedProject] = useState<fetchedData<ProjectType>>({
    content: [],
    last: false,
  });

  useEffect(() => {
    try {
      userInfo.no &&
        (async () => {
          setJoinedProject(await ProjectService.joinedProject());
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
          api={ProjectService.joinedProject}
          data={joinedProject}
          setData={setJoinedProject}
        >
          <SecondaryProjectLayout
            title="참여 중인 프로젝트"
            projectDtoList={joinedProject.content}
          />
        </InfiniteScrollLayout>
      )}
    </PrimaryLayout>
  );
};

export default MyJoinedProject;
