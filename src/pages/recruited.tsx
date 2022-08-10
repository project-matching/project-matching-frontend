import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { recruitedProject } from 'src/redux/reducers/projects/recruitedProjects';

const Recruited = () => {
  const token = useAppSelector((state) => state.auth.token);

  const recruitedProjects = useAppSelector(
    (state) => state.recruitedProjects.projectList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recruitedProject({ pageNumber: 0 }));
  }, [token, dispatch]);

  return (
    <PrimaryLayout>
      <SecondaryProjectLayout
        title="모집 완료된 프로젝트"
        projectDtoList={recruitedProjects}
      />
    </PrimaryLayout>
  );
};

export default Recruited;
