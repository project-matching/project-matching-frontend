import styled from '@emotion/styled';

export const AddContainer = styled.div`
  margin-bottom: 20px;
`;

export const SubTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Warning = styled.div`
  margin: 20px 0 30px;
  font-size: ${(props) => props.theme.sizes.sm};
  color: ${(props) => props.theme.colors.error};
`;

export const Input = styled.input`
  width: 300px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => props.theme.sizes.m};
`;
