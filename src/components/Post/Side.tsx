import styled from '@emotion/styled';
import { FC } from 'react';
import Title from '../auth/Title';

const Wrapper = styled.div`
  width: 20%;
  position: fixed;
  right: 0;
  background-color: #4242;
`;

interface IUser {
  name: string;
  no: number;
  register: boolean;
}

interface IPosition {
  positionName: string,
  projectPositionNo: number,
  userDto: IUser | null
}

interface Idata {
  applicationStatus: boolean,
  bookmark: boolean,
  currentPeople: number,
  endDate: string,
  introduction: string,
  maxPeople: number,
  name: string,
  projectNo: number,
  projectPositionDetailDtoList: IPosition[],
  startDate: string,
  state: boolean,
  technicalStackList: string[]
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
