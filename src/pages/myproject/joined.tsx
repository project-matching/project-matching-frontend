import InfiniteScrollLayout, {
  fetchedData,
} from '@/components/Common/Layouts/InfiniteScrollLayout';
import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyJoinedProject = () => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [joinedProject, setJoinedProject] = useState<fetchedData<ProjectType>>({
    content: [],
    last: false,
  });

  useEffect(() => {
    ProjectService.joinedProject()
      .then((joined) => setJoinedProject(joined))
      .catch((_error) => {
        dispatch(openModal('AuthModal'));
      });
  }, [userInfo.no, dispatch]);

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
