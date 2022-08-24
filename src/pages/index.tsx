import PrimaryProjectLayout from '@/components/Projects/PrimaryProjectLayout';
import MainSearchBar from '@/components/SearchBar/MainSearchBar';
import { useEffect, useState } from 'react';
import PrimaryLayout from 'src/components/Layouts/PrimaryLayout';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

interface PropTypes {
  initRecruitingProjects: ProjectType[];
  initRecruitedProjects: ProjectType[];
}

const Home = ({ initRecruitingProjects, initRecruitedProjects }: PropTypes) => {
  const token = useAppSelector((state) => state.auth.token);
  const [recruitingProjects, setRecruitingProjects] = useState(
    initRecruitingProjects
  );
  const [recruitedProjects, setRecruitedProjects] = useState(
    initRecruitedProjects
  );

  useEffect(() => {
    (async () => {
      setRecruitingProjects(await ProjectService.recruitingProjectPreview());
      setRecruitedProjects(await ProjectService.recruitedProjectPreview());
    })();
  }, [token]);

  return (
    <PrimaryLayout>
      <MainSearchBar />
      <PrimaryProjectLayout
        title="Recruiting"
        projectDtoList={recruitingProjects}
        href="recruiting"
      />
      <PrimaryProjectLayout
        title="Recruited"
        projectDtoList={recruitedProjects}
        href="recruited"
      />
    </PrimaryLayout>
  );
};

export default Home;

export async function getStaticProps() {
  const recruitingProject = await ProjectService.recruitingProjectPreview();
  const recruitedProject = await ProjectService.recruitedProjectPreview();

  return {
    props: {
      initRecruitingProjects: recruitingProject,
      initRecruitedProjects: recruitedProject,
    },
  };
}
