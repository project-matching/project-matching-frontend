import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Layouts/InfiniteScrollLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyCreatedProject = () => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [createdProject, setCreatedProject] = useState<
    fetchedData<ProjectType>
  >({
    content: [],
    last: false,
  });

  useEffect(() => {
    ProjectService.createdProject()
      .then((created) => setCreatedProject(created))
      .catch((_error) => {
        dispatch(openModal('AuthModal'));
      });
  }, [userInfo.no, dispatch]);

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
