import PrimaryLayout from '@/components/Common/Layouts/PrimaryLayout';
import MainSearchBar from '@/components/Common/SearchBar/MainSearchBar';
import PrimaryProjectLayout from '@/components/Projects/PrimaryProjectLayout';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService, ProjectType } from 'src/services/ProjectService';

interface PropTypes {
  initRecruitingProjects: ProjectType[];
  initRecruitedProjects: ProjectType[];
}

const Home = ({ initRecruitingProjects, initRecruitedProjects }: PropTypes) => {
  const initMount = useRef(true);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [recruitingProjects, setRecruitingProjects] = useState(
    initRecruitingProjects
  );
  const [recruitedProjects, setRecruitedProjects] = useState(
    initRecruitedProjects
  );

  useEffect(() => {
    if (initMount.current) {
      initMount.current = false;
    } else {
      Promise.all([
        ProjectService.recruitingProjectPreview(),
        ProjectService.recruitedProjectPreview(),
      ])
        .then(([recruiting, recruited]) => {
          setRecruitingProjects(recruiting);
          setRecruitedProjects(recruited);
        })
        .catch((_error) => {
          // TODO: 에러처리
        });
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
