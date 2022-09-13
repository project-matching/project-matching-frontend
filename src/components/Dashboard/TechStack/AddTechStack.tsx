import { DEFAULT_IMAGE } from '@/components/Headers/Profile';
import styled from '@emotion/styled';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import React from 'react';
import { postTechStack } from 'src/redux/reducers/techstacks';

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
    background-color: ${(props) => props.theme.colors.darkGray};
    border-radius: 50%;
    color: white;
    cursor: pointer;

    svg {
      width: 10px;
    }
  }
`;

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
    /**
     * TODO:
     * confirm 모달 열기
     * 모달에서 확인 누르면 api call
     */

    const inputValue = InputEl?.current?.value;
    if (!imageFile || !inputValue) return;

    const formData = new FormData();
    formData.set('image', imageFile);
    formData.set('technicalStackName', inputValue);

    dispatch(postTechStack(formData));
  };

  return (
    <Container>
      <Title>기술 스택 추가</Title>
      <Warning>
        ⚠주의: 기술 스택 삭제는 불가능합니다. 신중하게 추가해주세요.
      </Warning>
      <InputContainer>
        <ImageContainer>
          <Image
            src={image || DEFAULT_IMAGE}
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
        <a onClick={addTechStack}>추가</a>
      </InputContainer>
    </Container>
  );
};

export default AddTechStack;
