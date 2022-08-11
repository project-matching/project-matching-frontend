import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPositionRequest } from 'src/redux/reducers/position/loadPosition';
import { loadProjectRequest } from 'src/redux/reducers/post/load/loadProject';
import { RootState } from 'src/redux/store';

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleProject } = useSelector(
    (state: RootState) => state.loadProject
  );
  const { positionList } = useSelector(
    (state: RootState) => state.loadPosition
  );
  const { id } = router.query;
  console.log(id);
  console.log(singleProject);
  console.log(positionList);
  useEffect(() => {
    dispatch(loadProjectRequest(7));
    dispatch(loadPositionRequest());
  }, [dispatch]);

  return (
    <PrimaryLayout>
      <div></div>
    </PrimaryLayout>
  );
};

export default ProjectDetail;
