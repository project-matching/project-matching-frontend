import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Warning = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.sizes.sm};
  color: ${(props) => props.theme.colors.error};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => props.theme.sizes.m};
`;

const Input = styled.input`
  margin: 20px 0;
  width: 300px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #d4d4d4;
`;

const AddPosition = () => {
  const addPosition = () => {
    /**
     * TODO:
     * confirm 모달 열기
     * 모달에서 확인 누르면 api call
     */
  };

  return (
    <Container>
      <Title>포지션 추가</Title>
      <Warning>
        ⚠주의: 포지션 삭제는 불가능합니다. 신중하게 추가해주세요.
      </Warning>
      <InputContainer>
        <Input />
        <a onClick={addPosition}>추가</a>
      </InputContainer>
    </Container>
  );
};

export default AddPosition;