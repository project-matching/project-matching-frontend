import styled from '@emotion/styled';
import { FC } from 'react';
import { IPositionList } from 'src/redux/reducers/position/type';

export const SSelect = styled.select<{ hasError?: boolean }>`
  width: 20%;
  color: #000;
  padding: 7px 0;
  background-color: #fafafa;
  box-sizing: border-box;
  font-size: 10px;
  &::placeholder {
    font-size: 8px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

interface Props {
  register: any;
  options: any;
  name: string;
  handleSelectPos?: any;
}
const FormOption: FC<Props> = ({
  register,
  options,
  name,
  handleSelectPos,
  ...rest
}) => {
  options = [{ positionName: 'Select', positionNo: 0 }, ...options];

  const handleSelectPosition = (e: any) => {
    handleSelectPos(e.target.value);
  };

  return (
    <SSelect {...register(name)} {...rest} onChange={handleSelectPosition}>
      {options.map((v: IPositionList, i: number) => (
        <option key={i} value={v.positionName}>
          {v.positionName}
        </option>
      ))}
    </SSelect>
  );
};

export default FormOption;
