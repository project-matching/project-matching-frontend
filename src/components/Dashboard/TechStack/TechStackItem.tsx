import styled from '@emotion/styled';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import defaultProfileImage from 'public/default_profile.png';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { putTechStack } from 'src/redux/reducers/techstacks';

const Item = styled.li`
  margin: 20px 0;
  list-style: none;
  font-size: ${(props) => props.theme.sizes.m};
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

const Input = styled.input`
  width: 300px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #d4d4d4;
`;

interface PropsType {
  techStackName: string;
  image: string;
  techStackNo: number;
}

const setIdName = (name: string) => name.toLowerCase() + '-edit-image';

const TechStackItem = ({
  techStackName,
  image: initImage,
  techStackNo: technicalStackNo,
}: PropsType) => {
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
      background-color: ${(props) => props.theme.colors.darkGray};
      border-radius: 50%;
      color: white;
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
    /**
     * TODO:
     * confirm 모달 열기
     * 모달에서 확인 누르면 api call
     */
    if (!imageFile || !inputValue) return;

    const formData = new FormData();
    formData.set('image', imageFile);
    formData.set('technicalStackName', inputValue);

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
              <FontAwesomeIcon icon={solid('plus')} />
            </label>
            <input
              ref={ImageInputEl}
              onChange={editTechStackImage}
              type="file"
              name={setIdName(techStackName)}
              id={setIdName(techStackName)}
            ></input>
          </ImageContainer>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <ButtonContainer>
            <a onClick={editTechStack}>수정</a>
            <a onClick={() => setEdit(false)}>취소</a>
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
          <a onClick={() => setEdit(true)}>수정</a>
        </>
      )}
    </Item>
  );
};

export default TechStackItem;
