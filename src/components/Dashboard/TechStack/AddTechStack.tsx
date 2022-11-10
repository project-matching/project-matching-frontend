import BorderlessButton from '@/components/Common/Buttons//BorderlessButton';
import { colors } from '@/styles/theme';
import styled from '@emotion/styled';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import defaultProfileImage from 'public/default_profile.png';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTechStack } from 'src/redux/reducers/techstacks';
import {
  AddContainer,
  Input,
  InputContainer,
  SubTitle,
  Warning,
} from '../DashboardCommon';

const AddTechStack = () => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const ImageInputEl = useRef<HTMLInputElement>(null);
  const InputEl = useRef<HTMLInputElement>(null);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const uploadedImage = files[0];
      setImageFile(uploadedImage);
      const imageURL = uploadedImage && URL.createObjectURL(uploadedImage);
      if (imageURL) {
        setImage(imageURL);
      }
    }
  };

  const addTechStack = () => {
    const inputValue = InputEl?.current?.value;
    if (!imageFile || !inputValue) return;

    const formData = new FormData();
    formData.set('image', imageFile);
    formData.set('technicalStackName', inputValue);

    dispatch(postTechStack(formData));

    InputEl.current.value = '';
    setImage(null);
  };

  return (
    <AddContainer>
      <SubTitle>기술 스택 추가</SubTitle>
      <Warning>
        ⚠주의: 기술 스택은 삭제할 수 없습니다. 신중하게 추가해주세요.
      </Warning>
      <InputContainer>
        <ImageContainer>
          <Image
            src={image || defaultProfileImage}
            alt="add_techstack_image"
            width="30px"
            height="30px"
            style={{
              borderRadius: '50%',
            }}
          />
          <label htmlFor="tech-upload-image">
            <FontAwesomeIcon icon={solid('plus')} />
          </label>
          <input
            ref={ImageInputEl}
            onChange={handleProfileImage}
            type="file"
            name="tech-upload-image"
            id="tech-upload-image"
          ></input>
        </ImageContainer>
        <Input ref={InputEl} />
        <BorderlessButton type="button" onClick={addTechStack}>
          추가
        </BorderlessButton>
      </InputContainer>
    </AddContainer>
  );
};

export default AddTechStack;

const ImageContainer = styled.div`
  position: relative;

  input#tech-upload-image {
    display: none;
  }

  label {
    position: absolute;
    padding: 2px 4px;
    top: 25px;
    left: 25px;
    background-color: ${colors.gray300};
    border-radius: 50%;
    color: ${colors.white};
    cursor: pointer;

    svg {
      width: 10px;
    }
  }
`;
