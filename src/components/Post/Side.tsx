import styled from '@emotion/styled';
import { FC } from 'react';
import { IPositionListObj } from 'src/redux/reducers/position/type';

const Wrapper = styled.div`
  width: 300px;
  height: 500px;
  position: fixed;
  right: 100px;
  top: 130px;
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

const SideTop = styled.div`
  background-color: #4242;
  height: 100px;
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
const WrapperSpan = styled.div`
  display: flex;
  background-color: #4242;
  padding: 5px 50px;
`;

const SideSpan = styled.h3`
  width: 100px;
  display: flex;
`;
interface Props {
  data: IPositionListObj[];
}

const Side: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <SideTop>
        <Stitle>Project Details</Stitle>
        <Mtitle>Available Positions</Mtitle>
      </SideTop>
      {data.map((v: IPositionListObj, i: number) => (
        <WrapperSpan key={i}>
          <SideSpan>{v.position.positionName}</SideSpan>
          <SideSpan>{v.position.positionNo}</SideSpan>
        </WrapperSpan>
      ))}
      <BtnWrapper>
        <input type="submit" value="생성하기" />
        <input type="button" value="취소" />
      </BtnWrapper>
    </Wrapper>
  );
};

export default Side;
