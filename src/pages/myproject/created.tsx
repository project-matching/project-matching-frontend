import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyCreatedProject = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [createdProject, setCreatedProject] = useState<
    fetchedData<ProjectType>
  >({
    content: [],
    last: false,
  });

  useEffect(() => {
    token &&
      (async () => {
        setCreatedProject(await ProjectService.createdProject());
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
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
