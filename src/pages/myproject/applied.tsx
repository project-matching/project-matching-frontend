import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Common/Layouts/InfiniteScrollLayout';
import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import SecondaryProjectLayout from '@/components/Common/Layouts/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyAppliedProject = () => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [appliedProject, setAppliedProject] = useState<
    fetchedData<ProjectType>
  >({
    content: [],
    last: false,
  });

  useEffect(() => {
    ProjectService.appliedProject()
      .then((applied) => setAppliedProject(applied))
      .catch((_error) => {
        dispatch(openModal('AuthModal'));
      });
  }, [userInfo.no, dispatch]);

  return (
    <PrimaryLayout>
      {userInfo.no && (
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
