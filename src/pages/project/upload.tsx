import Title from '@/components/auth/Title';
import PrimaryLayout from '@/components/Layouts/PrimaryLayout';
import { PositionList, TechList } from '@/components/Post/faker/fake';
import Position from '@/components/Post/Position';
import FormOption from '@/components/Post/SelectBox';
import Side from '@/components/Post/Side';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  IPositionList,
  IPositionListObj,
} from 'src/redux/reducers/position/type';
import { createProjectRequest } from 'src/redux/reducers/post/create/createProject';

import { RootState, SagaStore, wrapper } from 'src/redux/store';

const Container = styled.div`
  max-width: 1280px;
  min-width: 1280px;
`;

const Form = styled.form``;

const TitleInput = styled.input`
  margin: 0 auto;
  width: 200px;
  height: 30px;
  position: relative;
  left: 30%;
  margin: 20px 0;
`;

const MainBox = styled.div`
  width: 40%;
  background-color: #4242;
  padding: 0 30px;
`;

const Introduction = styled.input`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const ProjectDetail = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, getValues } = useForm({});

  let [projectPositionRegisterDtoList, setProjectPositionRegisterDtoList] =
    useState<any>([]);

  const [myPos, setMyPos] = useState('');
  const [TechSelected, setTechSelected] = useState<any>([]);
  const [sendPos, setSendPos] = useState<any>([]);
  const [sendTech, setSendTech] = useState<any>([]);
  const { userInfo } = useSelector((state: RootState) => state.user);
  let positionBoolean = [] as boolean[];

  for (let i = 0; i < PositionList.length; i++) {
    if (PositionList[i].positionName === myPos) {
      positionBoolean.push(true);
    } else {
      positionBoolean.push(false);
    }
  }

  const handleSelectPos = useCallback((data: string) => {
    setMyPos(data);
  }, []);

  const handleSelectTech = useCallback(
    (e: any) => {
      if (TechSelected.includes(e.target.value) === false) {
        console.log(e.target.value);
        setTechSelected([...TechSelected, e.target.value]);
        if (e.target.value === TechList[0].technicalStackName) {
          setSendTech([...sendTech, 1]);
        } else if (e.target.value === TechList[1].technicalStackName) {
          setSendTech([...sendTech, 2]);
        } else setSendTech([...sendTech, 3]);
      }
    },
    [setTechSelected, TechSelected, setSendTech, sendTech]
  );
  console.log(sendTech);
  useEffect(() => {
    projectPositionRegisterDtoList.map((v: IPositionListObj) =>
      setSendPos([
        ...sendPos,
        {
          positionNo: v.position.positionNo,
          projectRegisterUserDto: v.projectRegisterUserDto,
        },
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectPositionRegisterDtoList]);

  const onSubmit = useCallback(() => {
    const { endDate, introduction, name, startDate } = getValues();
    const data = {
      endDate,
      startDate,
      introduction,
      name,
      projectPositionRegisterDtoList: sendPos,
      projectTechnicalStackList: sendTech,
    };
    dispatch(createProjectRequest(data));
  }, [getValues, sendPos, sendTech, dispatch]);

  return (
    <PrimaryLayout>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleInput
            type="text"
            placeholder="제목을 입력해주세요"
            {...register('name', { required: '입력해주세요' })}
          />

          <MainBox>
            <Title title="내 포지션" sm />
            <FormOption
              register={register}
              name="myPos"
              options={PositionList}
              handleSelectPos={handleSelectPos}
            />

            <Title title="Positions" sm />
            {PositionList.map((item: IPositionList, i: number) => (
              <div key={item.positionNo}>
                <Position
                  positionList={PositionList}
                  userInfo={userInfo}
                  data={item}
                  Selected={myPos}
                  positionBoolean={positionBoolean[i]}
                  projectPositionRegisterDtoList={
                    projectPositionRegisterDtoList
                  }
                  setProjectPositionRegisterDtoList={
                    setProjectPositionRegisterDtoList
                  }
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
            <select onChange={handleSelectTech}>
              {TechList.map((item) => (
                <option
                  value={item.technicalStackName}
                  key={item.technicalStackNo}
                >
                  {item.technicalStackName}
                </option>
              ))}
            </select>
            <div>{TechSelected}</div>

            <Title title="Introduction" sm />

            <Introduction
              type="text"
              {...register('introduction', { required: '입력해주세요' })}
            />
            {/* <TextEditor /> */}
          </MainBox>

          <Side data={projectPositionRegisterDtoList} />
        </Form>
      </Container>
    </PrimaryLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }: any) => {
      // store.dispatch(loadPositionRequest());
      // store.dispatch(loadTechRequest());
      // store.dispatch(END);

      await (store as SagaStore).sagaTask?.toPromise();

      return {
        props: {},
      };
    }
);

export default ProjectDetail;
