import BorderlessButton from '@/components/Common/Buttons//BorderlessButton';
import ImageAddButton from '@/components/Common/Buttons/ImageAddButton';
import { colors, fontSize } from '@/styles/theme';
import styled from '@emotion/styled';
import Image from 'next/image';
import defaultProfileImage from 'public/default_profile.png';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { putTechStack } from 'src/redux/reducers/techstacks';
import { setIdName } from 'src/utils/common';
import { Input } from '../DashboardCommon';

interface Props {
  techStackName: string;
  image: string;
  techStackNo: number;
}

const TechStackItem = ({
  techStackName,
  image: initImage,
  techStackNo: technicalStackNo,
}: Props) => {
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState(initImage);
  const [isEdit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(techStackName);

  const ImageInputEl = useRef<HTMLInputElement>(null);

  const ImageContainer = styled.div`
    position: relative;

    input#${setIdName(techStackName)} {
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

  const editTechStackImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const editTechStack = () => {
    if (!imageFile && !inputValue) return;

    const formData = new FormData();
    imageFile && formData.set('image', imageFile);
    inputValue && formData.set('technicalStackName', inputValue);

    dispatch(putTechStack({ technicalStackNo, formData }));
    setEdit(false);
  };

  return (
    <Item>
      {isEdit ? (
        <InputContainer>
          <ImageContainer>
            <Image
              src={image || defaultProfileImage}
              alt={techStackName}
              width="30px"
              height="30px"
              style={{
                borderRadius: '50%',
              }}
            />
            <label htmlFor={setIdName(techStackName)}>
              <ImageAddButton />
            </label>
            <input
              ref={ImageInputEl}
              onChange={editTechStackImage}
              type="file"
              name={setIdName(techStackName)}
              id={setIdName(techStackName)}
              accept="image/*"
            ></input>
          </ImageContainer>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <ButtonContainer>
            <BorderlessButton type="button" onClick={editTechStack}>
              수정
            </BorderlessButton>
            <BorderlessButton type="button" onClick={() => setEdit(false)}>
              취소
            </BorderlessButton>
          </ButtonContainer>
        </InputContainer>
      ) : (
        <>
          <Image
            src={image || defaultProfileImage}
            alt={techStackName}
            width="30px"
            height="30px"
            style={{
              borderRadius: '50%',
            }}
          />
          <div>{techStackName}</div>
          <BorderlessButton type="button" onClick={() => setEdit(true)}>
            수정
          </BorderlessButton>
        </>
      )}
    </Item>
  );
};

export default TechStackItem;

const Item = styled.li`
  margin: 20px 0;
  list-style: none;
  font-size: ${fontSize.m};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
