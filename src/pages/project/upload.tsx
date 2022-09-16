import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import { Backdrop } from '@/components/Modals/Backdrop';
import ConfirmModal from '@/components/Post/ConfirmModal';
import styled from '@emotion/styled';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { ProjectService } from 'src/services/ProjectService';
import { PositionService } from '../../services/PositionService';
import { TechStackService } from '../../services/TechStackService';

const Form = styled.form`
  width: 100%;
  display: flex;
`;
const Main = styled.div`
  background-color: #4242;
  width: 60%;
  padding: 0 30px;
`;
const Side = styled.div`
  width: 20%;
  height: 40%;
  position: fixed;
  right: 10%;
`;
const Introduction = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 50px;
`;
const SideTop = styled.div`
  background-color: #4242;
  padding: 10px 50px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  input {
    border: none;
    width: 220px;
    background-color: #4242;
    margin-bottom: 10px;
    padding: 10px 0;
    font-weight: 800;
    cursor: pointer;
  }
`;
const Stitle = styled.span`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  span:last-child {
    margin-left: 30px;
    font-weight: 200;
  }
`;
const Mtitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  padding-top: 20px;
  display: inline-block;
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

const PositionDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;

  span {
    margin: 0 5px;
  }
`

const SidePositionSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 50%;
`

interface positions {
  [index: string]: number
}

interface position {
  positionNo: number,
  positionName: string,
  count: number,
}

interface techStack {
  technicalStackNo: number,
  technicalStackName: string,
  image: null | string,
}

interface positionInfo {
  positionNo: number;
  projectRegisterUserDto: {
    userNo: number | null;
  } | null;
}

const ProjectUpload = () => {
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [positions, setPositions] = useState<position[]>([]);
  const [teckStacks, setTechStacks] = useState<techStack[]>([]);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [introduction, setIntroduction] = useState<string>("");
  const [curSelectedTech, setCurSelectedTech] = useState<string>(teckStacks[0]?.technicalStackName);
  const [selectedTechList, setSelectedTechList] = useState<techStack[]>([]);
  const [myPosition, setMyPosition] = useState(positions[0]?.positionName);
  const [onModal, setOnModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const user = useAppSelector(state => state.user);
  const router = useRouter();
  
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
  };

  const handlePositions = (e: React.BaseSyntheticEvent, selectedPosition: string) => {
    const target = e.target.id;

    if (target === "minus"){
      setPositions(prev => {
        return prev.map((position: position) => {
          if (position.positionName === selectedPosition && position.count > 0) {
            position.count--; 
          }
          return position;
        });
      });
    }

    if (target === "plus") {
      setPositions(prev => {
        return prev.map((position: position) => {
          if (position.positionName === selectedPosition) {
            position.count++;
          }
          return position;
        });
      });
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const prevPosition = myPosition;
    const curPosition = e.target.value;

    setPositions(positions => {
      return positions.map(position => {
        if (position.positionName === prevPosition) position.count--;
        if (position.positionName === curPosition) position.count++;
        return position;
      });
    });
    setMyPosition(curPosition);
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
  }

  const onCreate = useCallback(() => {
    setOnModal(!onModal);
    document.body.style.overflow = "hidden";
  }, []);

  const makePositionDtoList = (positions: position[]) => {
    const result: positionInfo[] = [];

    positions.forEach((position: position) => {
      if (!position.count) return;

      const isMine = myPosition === position.positionName;
      const information = isMine ? {userNo:  user.userInfo.no} : null;

      for (let i = 0; i < position.count; i++) {
        const positionInfo = {
          positionNo: position.positionNo,
          projectRegisterUserDto: !i ? information : null
        }

        result.push(positionInfo);
      }
    });

    return result;
  }

  useEffect(() => {
    (async () => {
      const positions = await PositionService.getPositions();
      const techStack = await TechStackService.getTechStacks();

      setPositions(positions.map((position: position) => {
        position["count"] = 0;
        return position;
      }));

      setTechStacks(techStack);
    })();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const projectTechnicalStackList = selectedTechList.map(tech => tech.technicalStackNo);
    const projectPositionRegisterDtoList: positionInfo[] = makePositionDtoList(positions);

    (async () => {
      const result = {
        name: projectTitle,
        projectPositionRegisterDtoList,
        endDate,
        startDate,
        projectTechnicalStackList,
        introduction,
      };

      try {
        const register = await ProjectService.registerProject(result);

        register.status === 200 && router.push("/");
      } catch (err) {
        console.log(err)
      }
    })();
  }, [isReady]);

  return (
    <PrimaryLayout>
      <MainTitle>
        <label htmlFor="title">
          <input type="text" value={projectTitle} onChange={handleTitle} placeholder="Project Title"/>
        </label>
      </MainTitle>
      <Form>
        <Main>
          <Title title="내 포지션" sm />
          <select onChange={handleSelect} value={myPosition}>
            <option value={"선택해 주세요"} key={"init"}>
              선택해주세요
            </option>
            {positions.map((position) => (
              <option value={position.positionName} key={position.positionNo}>
                {position.positionName}
              </option>
            ))}
          </select>

          <Title title="Positions" sm />
          {positions.map((position: position) => {
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

          <Title title="Tech Stacks" sm />
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

        <Side>
          <SideTop>
            <Stitle>Project Details</Stitle>
            <Mtitle>Available Positions</Mtitle>
            {positions.map(position => {
              if (!position.count) return;

              return (
                <>
                  <SidePositionSection key={position.positionNo}>
                    <span>{position.positionName}</span>
                    <span>{position.count}</span>
                  </SidePositionSection>
                </>
              )
            })}
          </SideTop>
          <BtnWrapper>
            <input type="button" value="생성하기" onClick={onCreate} />
            <input type="button" value="취소" />
          </BtnWrapper>
        </Side>
        {onModal &&
          <Backdrop>
            <ConfirmModal title="정말 생성하시겠습니까?" setOnModal={setOnModal} setIsReady={setIsReady} />
          </Backdrop>
        }
      </Form>
    </PrimaryLayout>
  );
};

export default ProjectUpload;
