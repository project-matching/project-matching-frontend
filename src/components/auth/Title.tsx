import styled from '@emotion/styled';
import { FC } from 'react';

const STitle = styled.h1<{ sm: boolean }>`
  text-align: center;
  font-size: 25px;
  font-weight: 600;

  display: ${(props) => (props.sm ? 'flex' : 'block')};
  padding: ${(props) => (props.sm ? '20px 0' : '30px 0')};
  font-size: ${(props) => (props.sm ? '16px;' : '25px')};
`;

interface Props {
  title: string;
  sm?: boolean;
}

const Title: FC<Props> = ({ title, sm }) => {
  return <STitle sm={sm ? true : false}>{title}</STitle>;
};
export default Title;
