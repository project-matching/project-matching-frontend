import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import ConfirmModal from '@/components/Post/ConfirmModal';
import Position from '@/components/Post/Position';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
const Introduction = styled.input`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 50px;
`;
const SideTop = styled.div`
  background-color: #4242;
  height: 150px;
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
const ProjectDetail = () => {
  const { register } = useForm();
  const [npm, setNpm] = useState(0);
  const [NDesigner, setNDesigner] = useState(0);
  const [NFrontend, setNFrontend] = useState(0);
  const [NBackend, setNBackend] = useState(0);
  const [NFullstack, setNFullstack] = useState(0);

  const [PostTechList, setPostTechList] = useState<any>([]);

  const selectList = [
    'Pm',
    'Designer',
    'Frontend',
    'Backend',
    'Fullstack',
  ] as any[];
  const TechList = ['선택하세요', 'react', 'spring', 'node', 'vue'];
  const NumberPos = [npm, NDesigner, NFrontend, NBackend, NFullstack];

  const [Selected, setSelected] = useState('PM');
  const [TechSelected, setTechSelected] = useState('');

  const handleSelect = (e: any) => {
    setSelected(e.target.value);
  };

  const handleTech = (e: any) => {
    setTechSelected(e.target.value);
  };

  useEffect(() => {
    if (PostTechList.includes(TechSelected) === false) {
      setPostTechList([TechSelected, ...PostTechList]);
    }
  }, [TechSelected, PostTechList]);

  let newObj = selectList.reduce((acc, cur, idx) => {
    acc[cur] = NumberPos[idx];
    return acc;
  }, new Object());
  newObj = Object.entries(newObj);
  let sidePos = newObj.filter((v: any) => v[1] > 0);

  const [onModal, setOnModal] = useState(false);
  const [ok, setOk] = useState(false);

  console.log(ok);
  const onCreate = useCallback(() => {
    setOnModal((cur) => !cur);
  }, []);

  return (
    <PrimaryLayout>
      <Title title="Project Title" />
      <Form>
        <Main>
          <Title title="내 포지션" sm />
          <select onChange={handleSelect} value={Selected}>
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <Title title="Positions" sm />
          {newObj.map((v: any, i: number) => (
            <div key={i}>
              <Position
                obj={v}
                setNpm={setNpm}
                setNDesigner={setNDesigner}
                setNFrontend={setNFrontend}
                setNBackend={setNBackend}
                setNFullstack={setNFullstack}
              />
            </div>
          ))}

          <Title title="Period" sm />
          <div>
            <input
              type="date"
              {...register('startDate', { required: '입력해주세요' })}
            />
            <span> ~ </span>
            <input
              type="date"
              {...register('endDate', { required: '입력해주세요' })}
            />
          </div>

          <Title title="Tech Stacks" sm />
          <select onChange={handleTech} value={TechSelected}>
            {TechList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <div>
            {PostTechList.map((item: any, i: number) => (
              <span key={i} style={{ marginRight: '10px' }}>
                {item}
              </span>
            ))}
          </div>

          <Title title="Introduction" sm />

          <Introduction
            type="text"
            {...register('introduction', { required: '입력해주세요' })}
          />
        </Main>

        <Side>
          <SideTop>
            <Stitle>Project Details</Stitle>
            <Mtitle>Available Positions</Mtitle>
            <div>
              {sidePos.map((v: any, i: number) => (
                <p key={i}>{v}</p>
              ))}
            </div>
          </SideTop>
          <BtnWrapper>
            <input type="button" value="생성하기" onClick={onCreate} />
            <input type="button" value="취소" />
          </BtnWrapper>
        </Side>
        {onModal ? (
          <ConfirmModal title="정말 생성하시겠습니까?" setOk={setOk} />
        ) : null}
      </Form>
    </PrimaryLayout>
  );
};

export default ProjectDetail;
