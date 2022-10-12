import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { CommentService } from '../../services/CommentService';
import SecondaryButton from '../Buttons/SecondaryButton';

const CommentLayout = styled.div`
  font-size: ${(props) => props.theme.sizes.m};
  button {
    padding: 5px;
    margin: 0 3px;
  }
`;

interface Props {
  contentNo: number;
  content: string;
  isRegistrant: Boolean;
}

const Comment = ({ content, contentNo, isRegistrant }: Props) => {
  const [comment, setContent] = useState<string>(content);
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const onEdit = async () => {
    if (isEditing) {
      await CommentService.fixComment(contentNo, { content: comment });
    }
    setIsEditing(!isEditing);
  };

  const onDelete = async () => {
    await CommentService.deleteComment(contentNo);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <CommentLayout>
      {!isEditing ? (
        <main>{comment}</main>
      ) : (
        <input type="text" value={comment} onChange={onChange} />
      )}
      {isRegistrant && (
        <aside>
          {isEditing ? (
            <SecondaryButton onClick={onEdit}>저장</SecondaryButton>
          ) : (
            <SecondaryButton onClick={onEdit}>수정</SecondaryButton>
          )}
          <SecondaryButton onClick={onDelete}>삭제</SecondaryButton>
        </aside>
      )}
    </CommentLayout>
  );
};

export default Comment;
