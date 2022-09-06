import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyAppliedProject = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [appliedProject, setAppliedProject] = useState<
    fetchedData<ProjectType>
  >({
    content: [],
    last: false,
  });

  useEffect(() => {
    token &&
      (async () => {
        setAppliedProject(await ProjectService.appliedProject());
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
        <InfiniteScrollLayout
          api={ProjectService.appliedProject}
          data={appliedProject}
          setData={setAppliedProject}
        >
          <SecondaryProjectLayout
            title="신청 중인 프로젝트"
            projectDtoList={appliedProject.content}
          />
        </InfiniteScrollLayout>
      )}
    </PrimaryLayout>
  );
};

export default MyAppliedProject;
