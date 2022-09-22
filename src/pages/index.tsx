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
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [recruitingProjects, setRecruitingProjects] = useState(
    initRecruitingProjects
  );
  const [recruitedProjects, setRecruitedProjects] = useState(
    initRecruitedProjects
  );

  useEffect(() => {
    try {
      (async () => {
        setRecruitingProjects(await ProjectService.recruitingProjectPreview());
        setRecruitedProjects(await ProjectService.recruitedProjectPreview());
      })();
    } catch (error: any) {
      // TODO: 네트워크 상태를 확인해주세요.
    }
  }, [userInfo.no]);

  return (
    <PrimaryLayout>
      <MainSearchBar />
      <PrimaryProjectLayout
        title="Recruiting"
        projectDtoList={recruitingProjects}
        href="/recruiting"
      />
      <PrimaryProjectLayout
        title="Recruited"
        projectDtoList={recruitedProjects}
        href="/recruited"
      />
    </PrimaryLayout>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const recruitingProject = await ProjectService.recruitingProjectPreview();
    const recruitedProject = await ProjectService.recruitedProjectPreview();

    return {
      props: {
        initRecruitingProjects: recruitingProject,
        initRecruitedProjects: recruitedProject,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        initRecruitingProjects: [],
        initRecruitedProjects: [],
      },
    };
  }
}
