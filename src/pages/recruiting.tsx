import SecondaryProjectLayout from '@/components/Projects/SecondaryProjectLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { recruitingProject } from 'src/redux/reducers/projects/recruitingProjects';

/**
 * TODOS:
 * 무한 스크롤 구현
 */

const Recruiting = () => {
  const token = useAppSelector((state) => state.auth.token);

  const recruitingProjects = useAppSelector(
    (state) => state.recruitingProjects.projectList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recruitingProject({}));
  }, [token, dispatch]);

  return (
    <PrimaryLayout>
      <SecondaryProjectLayout
        title="모집 중인 프로젝트"
        projectDtoList={recruitingProjects}
      />
    </PrimaryLayout>
  );
};

export default Recruiting;
