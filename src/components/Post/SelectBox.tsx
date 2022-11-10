import { colors } from '@/styles/theme';
import styled from '@emotion/styled';
import { FC } from 'react';

export const SSelect = styled.select<{ hasError?: boolean }>`
  width: 20%;
  color: ${colors.black};
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
  options: string[];
  name: string;
}
const FormOption: FC<Props> = ({ register, options, name, ...rest }) => {
  return (
    <SSelect {...register(name)} {...rest}>
      {options.map((v: string) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </SSelect>
  );
};

export default FormOption;
