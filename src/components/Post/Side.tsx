import styled from '@emotion/styled';
import { FC } from 'react';
import Title from '../auth/Title';

const Wrapper = styled.div`
  width: 20%;
  position: fixed;
  right: 0;
  background-color: #4242;
`;

interface ITech {
  id: number;
  name: string;
}
interface IUser {
  id: number;
  name: string;
  apply: boolean;
}
interface IPosition {
  id: number;
  name: string;
  user: IUser;
}
interface Idata {
  ProjectNum: number;
  title: string;
  startData: string;
  endData: string;
  currentState: boolean;
  content: string;
  currentPeople: number;
  allPeople: number;
  Bookmark: boolean;
  req: boolean;
  tech: ITech[];
  position: IPosition[];
}
interface Props {
  data: Idata;
}
const Side: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Title title="Project Detail" />
    </Wrapper>
  );
};

export default Side;
