import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import PrimaryProjectLayout from '@/components/Projects/PrimaryProjectLayout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { openModal } from 'src/redux/reducers/components/modals';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

const MyProject = () => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [createdProject, setCreatedProject] = useState<ProjectType[]>([]);
  const [joinedProject, setJoinedProject] = useState<ProjectType[]>([]);
  const [appliedProject, setAppliedProject] = useState<ProjectType[]>([]);

  useEffect(() => {
    Promise.all([
      ProjectService.createdProjectPreview(),
      ProjectService.joinedProjectPreview(),
      ProjectService.appliedProjectPreview(),
    ])
      .then(([created, joined, applied]) => {
        setCreatedProject(created);
        setJoinedProject(joined);
        setAppliedProject(applied);
      })
      .catch((_error) => {
        dispatch(openModal('AuthModal'));
      });
  }, [userInfo.no, dispatch]);

  return (
    <PrimaryLayout>
      {userInfo.no && (
        <>
          <PrimaryProjectLayout
            title="내가 만든 프로젝트"
            projectDtoList={createdProject}
            href="/myproject/created"
          />
          <PrimaryProjectLayout
            title="참여 중인 프로젝트"
            projectDtoList={joinedProject}
            href="/myproject/joined"
          />
          <PrimaryProjectLayout
            title="신청 중인 프로젝트"
            projectDtoList={appliedProject}
            href="/myproject/applied"
          />
        </>
      )}
    </PrimaryLayout>
  );
};

export default MyProject;
