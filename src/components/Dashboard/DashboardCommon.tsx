import { colors, fontSize, fontWeight } from '@/styles/theme';
import styled from '@emotion/styled';

export const AddContainer = styled.div`
  margin-bottom: 20px;
`;

export const SubTitle = styled.h3`
  font-weight: ${fontWeight.bold};
  margin-bottom: 10px;
`;

export const Warning = styled.div`
  margin: 20px 0 30px;
  font-size: ${fontSize.sm};
  color: ${colors.error};
`;

export const Input = styled.input`
  width: 300px;
  padding: 5px 10px;
  font-size: ${fontSize.lg};
  border: 1px solid ${colors.gray300};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: ${fontSize.m};
`;
