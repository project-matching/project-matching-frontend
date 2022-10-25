import BorderlessButton from '@/components/Buttons/BorderlessButton';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postPosition } from 'src/redux/reducers/positions';
import {
  AddContainer,
  Input,
  InputContainer,
  SubTitle,
  Warning,
} from '../DashboardCommon';

const AddPosition = () => {
  const dispatch = useDispatch();
  const InputRef = useRef<HTMLInputElement>(null);

  const addPosition = async () => {
    if (!InputRef || !InputRef.current) {
      return;
    }
    const positionName = InputRef.current.value;
    dispatch(postPosition(positionName));
    InputRef.current.value = '';
  };

  return (
    <AddContainer>
      <SubTitle>포지션 추가</SubTitle>
      <Warning>
        ⚠주의: 포지션은 삭제할 수 없습니다. 신중하게 추가해주세요.
      </Warning>
      <InputContainer>
        <Input ref={InputRef} />
        <BorderlessButton type="button" onClick={addPosition}>
          추가
        </BorderlessButton>
      </InputContainer>
    </AddContainer>
  );
};

export default AddPosition;
