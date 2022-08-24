import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';

const MyAppliedProject = () => {
  const token = useAppSelector((state) => state.auth.token);

  const [appliedProject, setAppliedProject] = useState([]);

  useEffect(() => {
    token &&
      (async () => {
        setAppliedProject((await ProjectService.appliedProject()).content);
      })();
  }, [token]);

  return (
    <PrimaryLayout>
      {token && (
        <SecondaryProjectLayout
          title="신청 중인 프로젝트"
          projectDtoList={appliedProject}
        />
      )}
    </PrimaryLayout>
  );
};

export default MyAppliedProject;
