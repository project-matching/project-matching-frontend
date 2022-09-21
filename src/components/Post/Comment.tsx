import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { CommentService } from '../../services/CommentService';

const CommentLayout = styled.div`
  button {
    border: 0;
    outline: 0;
    padding: 5px;
    margin: 0 3px;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
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
            <button onClick={onEdit}>저장</button>
          ) : (
            <button onClick={onEdit}>수정</button>
          )}
          <button onClick={onDelete}>삭제</button>
        </aside>
      )}
    </CommentLayout>
  );
};

export default Comment;
