import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import styled from '@emotion/styled';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { PositionType } from 'src/services/PositionService';
import { ProjectService } from 'src/services/ProjectService';
import { TechStackService } from 'src/services/TechStackService';
import { PositionService } from '../../../services/PositionService';
import { data } from '../[id]';

const State = styled.h3`
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Left = styled.div`
  width: 70%;
`;

const Main = styled.div`
  width: 100%;
  background-color: #5454;
  padding: 0 20px;
  padding-bottom: 20px;
`;

const Introduction = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const PositionDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;

  span {
    margin: 0 5px;
  }
`;

const Side = styled.div`
  width: 20%;
  position: fixed;
  right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  background-color: #4242;

  h1 {
    font-size: 20px;
    margin: 5px 0;
  }

  button {
    border: 0;
    outline: 0;
    padding: 5px;
    cursor: pointer;
    &:hover {
    background-color: gray;
    }
  }
`;

const MemberRow = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 10px 0;
  }
  span {
    width: 90%;
  }
`;

const MemberDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonRows = styled.div`
  position: fixed;
  width: 20%;
  right: 5%;
  bottom: 35%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    border: 0;
    outline: 0;
    padding: 5px;
    margin: 5% 0;
    cursor: pointer;
    width: 100%;
    &:hover {
    background-color: gray;
    }
  }
`;

const MainTitle = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  input {
    width: 300px;
    height: 30px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: #4242;
    text-align: center;
  }
`;

interface addPosition {
  count: number,
  positionNumber: number,
}

interface userDto {
  name: string,
  no: number,
  register: boolean
}

interface position {
  projectpositionNo: number,
  positionName: string,
  userDto: userDto | null
}

interface filteredPosition {
  positionNo: number,
  positionName: string,
  count: number,
}

interface techStack {
  technicalStackNo: number,
  technicalStackName: string,
  image: null | string,
}

interface project extends data {
  positions: any;
}

interface Props {
  project: project,
}

const ProjectModification = ({ project }: Props) => {
  const [projectTitle, setProjectTitle] = useState<string>(project.name);
  const [positions, setPositions] = useState<filteredPosition[]>([]);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [introduction, setIntroduction] = useState<string>("");
  const [teckStacks, setTechStacks] = useState<techStack[]>([]);
  const [curSelectedTech, setCurSelectedTech] = useState<string>(teckStacks[0]?.technicalStackName);
  const [selectedTechList, setSelectedTechList] = useState<techStack[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
  };

  const handlePositions = (e: React.BaseSyntheticEvent, selectedPosition: string) => {
    const target = e.target.id;

    if (target === "minus") {
      setPositions(prev => {
        return prev.map((position: filteredPosition) => {
          if (position.positionName === selectedPosition && position.count > 0) {
            position.count--; 
          }
          return position;
        });
      });
    }

    if (target === "plus") {
      setPositions(prev => {
        return prev.map((position: filteredPosition) => {
          if (position.positionName === selectedPosition) {
            position.count++;
          }
          return position;
        });
      });
    }
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const id = e.target.id;

    if (id === "startDate") {
      setStartDate(date);
    }
    
    if (id === "endDate") {
      setEndDate(date);
    }
  }

  const handleIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

  const handleTech = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTechStackName = e.target.value;
    const selectedTechStack = teckStacks.find(techStack => techStack.technicalStackName === selectedTechStackName) as techStack;

    setCurSelectedTech(selectedTechStackName);

    if (!selectedTechStack) return;

    setSelectedTechList((prev: techStack[]) => {
      if (prev.includes(selectedTechStack)) return prev;

      const newList = [...prev, selectedTechStack];

      return newList;
    });
  };

  const handleButtons = (e: React.BaseSyntheticEvent) => {
    const target = e.target.id;

    if (target === "modification") {
      const projectPositionAddDtoList: addPosition[] = [];
      const projectPositionDeleteDtoList: {projectPositionNo: number}[] = [];
      const projectTechnicalStackNoList: number[] = [];

      positions.forEach((position: filteredPosition) => {
        const origin = project.positions[position.positionName];

        if (origin) {
          const count = position.count - origin.length;

          count > 0 && projectPositionAddDtoList.push({positionNumber: position.positionNo, count});
          count < 0 && projectPositionDeleteDtoList.push({projectPositionNo: position.positionNo});
        } else {
          position.count > 0 && projectPositionAddDtoList.push({positionNumber: position.positionNo, count: position.count});
        }
      });

      selectedTechList.forEach(tech => {
        projectTechnicalStackNoList.push(tech.technicalStackNo);
      });

      const modifiedProject = {
        endDate,
        introduction,
        name: projectTitle,
        startDate,
        projectPositionAddDtoList,
        projectPositionDeleteDtoList,
        projectTechnicalStackNoList
      };

      (async () => {
        const response = await ProjectService.modifyProject(id as string, modifiedProject);
        // 500 error
      })();
    }

    
  }

  useEffect(() => {
    (async() => {
      const techStack = await TechStackService.getTechStacks();
      let positions: PositionType[] | filteredPosition[] = await PositionService.getPositions();
      positions = positions.map((position: any) => {
        position["count"] = project.positions[position.positionName] ? project.positions[position.positionName].length : 0;

        return position;
      });

      setTechStacks(techStack);
      setPositions(positions as filteredPosition[]);
    })();

  }, []);

  return (
    <PrimaryLayout>
      <MainTitle>
        <label htmlFor="title">
          <input type="text" value={projectTitle} onChange={handleTitle} />
        </label>
      </MainTitle>
      <State>{!project?.applicationStatus ? '모집중' : '모집종료'}</State>
      <Wrapper>
        <Left>
          <Main>
            <Title title="Positions" sm />
              {positions.map((position: filteredPosition) => {
                  return (
                    <>
                      <PositionDetail key={position.positionNo}>
                        <span>{position.positionName}</span>
                        <div onClick={(e) => {handlePositions(e, position.positionName)}}>
                          <span id="minus">-</span>
                          <span>{position.count}</span>
                          <span id="plus">+</span>
                        </div>
                      </PositionDetail>
                    </>
                  )
                })}
            <Title title="Period" sm />
            <div>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={handleDate}
                min={moment().format("YYYY-MM-DD")}
                max={endDate}
              />
              <span> ~ </span>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={handleDate}
                min={startDate}
              />
            </div>
            <Title title="Tech Stack" sm />
            <select onChange={handleTech} value={curSelectedTech}>
            <option value={"선택해 주세요"} key={"init"}>
              선택해주세요
            </option>
            {teckStacks.map((techStack) => (
              <option value={techStack.technicalStackName} key={techStack.technicalStackNo}>
                {techStack.technicalStackName}
              </option>
            ))}
          </select>
          <div>
            {selectedTechList.map((tech) => (
              <span key={tech.technicalStackNo} style={{ marginRight: '10px' }}>
                {tech.technicalStackName}
              </span>
            ))}
          </div>
            <Title title="Introduction" sm />
            <Introduction value={introduction} onChange={handleIntroduction}/>
          </Main>
        </Left>
        <Side>
          <Title title="Project Detail" sm/>
            <MemberRow>
              <h1>Current Members</h1>
              {project.projectPositionDetailDtoList.map(member => {
                if (!member.userDto) return null;

                return (
                  <MemberDetail key={member.userDto.name}>
                    <span>{member.positionName}</span>
                    <span>{member.userDto.name} </span>
                  </MemberDetail>
                )
              })}
            </MemberRow>
            <ButtonRows onClick={handleButtons}>
              <button id="modification">수정하기</button>
              <button id="delete">삭제하기</button>
            </ButtonRows>
        </Side>
      </Wrapper>
    </PrimaryLayout>
  )
}

interface positions {
  [index: string]: Array<userDto>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectNo = context.query.id as string;
  const projectData = await ProjectService.getProjectDetail(projectNo);
  const positions: positions = {};

  projectData.data.projectPositionDetailDtoList.forEach((position: position) => {
    if (positions[position.positionName]) {
      position.userDto && positions[position.positionName].push(position.userDto as userDto)
    } else {
      position.userDto ?
      positions[position.positionName] = [position.userDto as userDto] :
      positions[position.positionName] = [];
    }
  });

  projectData.data["positions"] = positions;
  return {
    props: {
      project: projectData.data,
    }
  }
}

export default ProjectModification;
