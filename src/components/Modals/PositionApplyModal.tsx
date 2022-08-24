import styled from '@emotion/styled';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/reducers/components/modals';
import { ProjectService } from 'src/services/ProjectService';
import { UserService } from 'src/services/UserService';
import MultiSelectDropdown from '../Dropdowns/MultiSelectDropdown';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 60%;
  height: 80%;
  padding: 40px;
  background-color: white;
  z-index: 1000;
`

const Head = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    font-size: 25px;
    margin: 10px 0;
  }
  h2 {
    font-size: 20px;
  }
`

const Main = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TechBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`

const MotiveBox = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    height: 200px;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-evenly;
`

interface Props {
  projectName: string,
  position: string | null,
  positionNo: number | null
}

const PositionApplyModal: FC<Props> = ({projectName, position, positionNo}) => {
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

    const result = await ProjectService.applyProject(request);
    dispatch(closeModal("PositionApplyModal"));
  }

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
          <MultiSelectDropdown items={["JS", "Python"]} selectedItems={techStack} setSelectedItem={setTechStack} />
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
          <textarea maxLength={200} value={motive} onChange={writeMotive}/>
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
