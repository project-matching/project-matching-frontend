import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';

const MyJoinedProject = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [joinedProject, setJoinedProject] = useState([]);

  useEffect(() => {
    token &&
      (async () => {
        setJoinedProject((await ProjectService.joinedProject()).content);
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
        <SecondaryProjectLayout
          title="참여 중인 프로젝트"
          projectDtoList={joinedProject}
        />
      )}
    </PrimaryLayout>
  );
};

export default MyJoinedProject;
