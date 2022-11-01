import PrimaryButton from '@/components/Common/Buttons/PrimaryButton';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useRef } from 'react';
import { CommentService } from 'src/services/CommentService';

const InputContainer = styled.form`
  margin: 0 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  font-size: 16px;
`;

interface PropType {
  projectNo: number;
  setComments: Dispatch<SetStateAction<any>>;
}

const CommentInput = ({ projectNo, setComments }: PropType) => {
  const formRef = useRef<HTMLFormElement>(null);
  const submitComment = async (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      comment: {
        value: string;
      };
    };

    let commentValue = target.comment.value;

    try {
      formRef.current?.setAttribute('disabled', '');

      await CommentService.postComment(projectNo, { content: commentValue });
      setComments(await CommentService.getComments(projectNo, 0));
      commentValue = '';

      formRef.current?.removeAttribute('disabled');
    } catch (e: any) {
      // TODO: 에러 처리
    }
  };

  return (
    <InputContainer ref={formRef} onSubmit={submitComment}>
      <label htmlFor="comment">
        <Input name="comment" />
      </label>
      <PrimaryButton wFull>등록</PrimaryButton>
    </InputContainer>
  );
};

export default CommentInput;
