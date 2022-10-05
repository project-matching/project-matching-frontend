import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import PrimaryProjectLayout from '@/components/Projects/PrimaryProjectLayout';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';

const MyProject = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const token = useAppSelector((state) => state.auth.token);

  const [createdProject, setCreatedProject] = useState<any>([]);
  const [joinedProject, setJoinedProject] = useState([]);
  const [appliedProject, setAppliedProject] = useState([]);

  useEffect(() => {
    try {
      token &&
        Promise.all([
          ProjectService.createdProjectPreview(),
          ProjectService.joinedProjectPreview(),
          ProjectService.appliedProjectPreview(),
        ]).then(([created, joined, applied]) => {
          setCreatedProject(created);
          setJoinedProject(joined);
          setAppliedProject(applied);
        });
    } catch (error: any) {
      // TODO: 네트워크 상태를 확인해주세요.
      // TODO: 로그인을 해주세요.
    }
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
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
