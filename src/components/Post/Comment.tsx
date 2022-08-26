import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';
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
  contentNo: string,
  content: string,
  isRegistrant: Boolean,
}

const Comment = (props: Props) => {
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const onEdit = async () => {
    if (isEditing) {
      await CommentService.fixComment(props.contentNo, { content })
    }
    setIsEditing(!isEditing);
  }

  const onDelete = async () => {
    await CommentService.deleteComment(props.contentNo);
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    setContent(props.content);
  }, []);

  return (
    <CommentLayout>
      {!isEditing ?
        <main>
          {content}
        </main>
        :
        <input type="text" value={content} onChange={onChange} />
      }
      {props.isRegistrant && 
        <aside>
          {isEditing ? <button onClick={onEdit}>저장</button> : <button onClick={onEdit}>수정</button>}
          <button onClick={onDelete}>삭제</button>
        </aside>
      }
    </CommentLayout>
  )
};

export default Comment;
