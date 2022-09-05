import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyJoinedProject = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [joinedProject, setJoinedProject] = useState<fetchedData<ProjectType>>({
    content: [],
    last: false,
  });

  useEffect(() => {
    token &&
      (async () => {
        setJoinedProject(await ProjectService.joinedProject());
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
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
