import React from 'react';
import SmallButton from '../SmallButton';

interface ProjectStateButtonType {
  state: boolean;
  setRecruiting: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectStateButton = ({
  state,
  setRecruiting,
}: ProjectStateButtonType) => {
  return (
    <SmallButton onClick={() => setRecruiting(!state)}>
      {state ? '모집완료' : '모집중'}
    </SmallButton>
  );
};

export default ProjectStateButton;
