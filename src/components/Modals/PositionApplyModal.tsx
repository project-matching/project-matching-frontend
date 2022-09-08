import styled from '@emotion/styled';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/components/modals';
import { ProjectService } from 'src/services/ProjectService';
import { UserService } from 'src/services/UserService';
import { TechStackService } from '../../services/TechStackService';
import MultiSelectDropdown from '../Dropdowns/MultiSelectDropdown';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
  height: 80%;
  padding: 2%;
  background-color: white;
  z-index: 1000;

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

const Head = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 10%;

  h1 {
    font-size: 25px;
  }
  h2 {
    font-size: 20px;
  }
`;

const Main = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TechBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const MotiveBox = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    height: 200%;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-evenly;
`;

interface Props {
  projectName: string,
  position: string | null,
  positionNo: number | null
}

interface data {
  image: string,
  technicalStackName: string,
  technicalStackNo: number,
}

const PositionApplyModal: FC<Props> = ({projectName, position, positionNo}) => {
  const [listedTechStack, setListedTechStack] = useState<string[]>(["JS"]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [githubLink, setGithubLink] = useState<string>("");
  const [motive, setMotive] = useState<string>("");
  const dispatch = useDispatch();

  const submitCancel = () => {
    dispatch(closeModal("PositionApplyModal"));
  }

  const fillMyProfile = async () => {
    const myProfile = await UserService.getUserProfile();
    const myTechStack = myProfile.technicalStackList;

    setTechStack(myTechStack);
  }

  const writeGithubLink = (e: ChangeEvent<HTMLInputElement>) => {
    setGithubLink(e.target.value);
  }

  const writeMotive = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMotive(e.target.value);
  }

  const onSubmit = async () => {
    const request = {
      gitHub: githubLink,
      motive,
      projectPositionNo: positionNo,
      technicalStackList: techStack,
    }

    try {
      const result = await ProjectService.applyProject(request);

      result.status === 200 && dispatch(closeModal("PositionApplyModal"));
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      const response = await TechStackService.getTechStacks();
      setListedTechStack(response.map((data: data) => data.technicalStackName));
    })();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <>
      <Container>
        <Head>
          <h1>{projectName}</h1>
          <h2>{position}</h2>
        </Head>
        <Main>
          <TechBox>
            <Title>
              <span>내 기술 스택</span>
              <button type="button" onClick={fillMyProfile}>내 프로필로 자동 완성</button>
            </Title>
            <MultiSelectDropdown items={listedTechStack} selectedItems={techStack} setSelectedItem={setTechStack} />
          </TechBox>
          <TechBox>
            <Title>
              깃허브 주소
            </Title>
            <input placeholder="github.com/example" value={githubLink} onChange={writeGithubLink}/>
          </TechBox>
          <MotiveBox>
            <Title>
              <div>프로젝트 신청 동기*(최대 200자)</div>
            </Title>
            <textarea maxLength={200} rows={15} value={motive} onChange={writeMotive}/>
            <div>
              <span>{motive.length} / 200</span>
            </div>
          </MotiveBox>
        </Main>
        <Footer>
          <button type="submit" onClick={onSubmit}>신청</button>
          <button onClick={submitCancel}>취소</button>
        </Footer>
      </Container>
    </>
  )
}

export default PositionApplyModal;
