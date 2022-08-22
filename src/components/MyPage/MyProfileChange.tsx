import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchUserProfile, UserProfileType } from 'src/redux/reducers/users';
import { PositionService } from 'src/services/PositionService';
import PrimaryButton from '../Buttons/PrimaryButton';
import MultiSelectDropdown from '../Dropdowns/MultiSelectDropdown';
import UniSelectDropdown from '../Dropdowns/UniSelectDropdown';
import { DEFAULT_IMAGE } from '../Headers/Profile';

const ImageContainer = styled.div`
  margin-bottom: 50px;

  input#profile-image {
    padding: 0;
    border: 0;
  }
`;

const InfoTitle = styled.label`
  font-weight: bold;
  width: 80px;
`;

const InfoLi = styled.li<{ vertical?: boolean }>`
  display: flex;
  align-items: ${(props) => (props.vertical ? null : 'center')};
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  margin-bottom: 10px;
  ${(props) =>
    props.vertical
      ? `
  margin-top: 10px;
  margin-bottom: 20px;
  `
      : `
  margin-bottom: 10px;
  `}
  &:last-child {
    margin-bottom: 0;
  }

  > ${InfoTitle} {
    ${(props) =>
      props.vertical
        ? `
      margin-bottom: 10px;
      width: 100%;
      `
        : null}
  }

  > span {
    margin-right: 10px;
    line-height: 1.7;
  }

  > textarea {
    outline: none;
    border: 1px solid #d4d4d4;
    height: 130px;
    padding: 10px;
  }

  > input {
    padding: 5px;
    line-height: 1.7;
    border: 1px solid #d4d4d4;
    outline: none;
    height: 30px;
    width: 300px;
  }
`;

const InfoContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  width: 400px;
  margin: 20px auto 0;
`;

const defaultSex = ['남', '여', '없음'];

interface PositionDtoType {
  positionName: string;
  positionNo: number;
}

interface MyProfileProps {
  myProfile: UserProfileType;
}

const MyProfileChange = ({ myProfile }: MyProfileProps) => {
  const dispatch = useDispatch();
  const [defaultPositions, setDefaultPositions] = useState<Array<string>>([]);

  const {
    email,
    github: initGithub,
    image: initImage,
    name: initName,
    position: initPosition,
    selfIntroduction: initSelfIntroduction,
    sex: initSex,
    technicalStackList: initTechnicalStackList,
  } = myProfile;

  const convertSex = (initSex: string) => {
    return initSex === 'M' ? '남' : initSex === 'W' ? '여' : '없음';
  };

  const [image, setImage] = useState(initImage);
  const [name, setName] = useState(initName);
  const [sex, setSex] = useState(initSex);
  const [position, setPosition] = useState(initPosition);

  const [techStacks, setTechStack] = useState(initTechnicalStackList);
  const [github, setGithub] = useState(initGithub);
  const [selfIntroduction, setSelfIntroduction] =
    useState(initSelfIntroduction);
  const ImageInputEl = useRef<HTMLInputElement>(null);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const uploadedImage = files[0];
      const imageURL = uploadedImage && URL.createObjectURL(uploadedImage);
      if (imageURL) {
        setImage(imageURL);
      }
    }
  };

  const handleChangeName = (
    e: React.ChangeEvent & { target: { value: string } }
  ) => {
    setName(e.target.value);
  };

  const handleChangeGithub = (
    e: React.ChangeEvent & { target: { value: string } }
  ) => {
    setGithub(e.target.value);
  };

  const handleChangeSelfIntroduction = (
    e: React.ChangeEvent & { target: { value: string } }
  ) => {
    setSelfIntroduction(e.target.value);
  };

  const submitProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      github,
      name,
      position,
      selfIntroduction,
      sex,
      techStacks,
    };

    // TODO: 수정 제출
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, JSON.stringify(value));
    }

    dispatch(
      patchUserProfile({
        data: formData,
      })
    );

    image && URL.revokeObjectURL(image);
    setImage(DEFAULT_IMAGE);
  };

  const getPositionNameOnly = (positions: PositionDtoType[]) =>
    positions.map(({ positionName }) => positionName);

  useEffect(() => {
    // TODO: 최적화
    const init = async () => {
      const fetchedDefaultPositions: PositionDtoType[] =
        await PositionService.getPositions();

      setDefaultPositions(getPositionNameOnly(fetchedDefaultPositions));
    };

    if (email) {
      init();
    }
  }, [email]);

  return (
    <form onSubmit={submitProfile}>
      <ImageContainer>
        <Image
          // src={image || DEFAULT_IMAGE}
          src={DEFAULT_IMAGE} // TODO: URL 변경 시 수정
          alt="profile_image"
          width="50px"
          height="50px"
          style={{
            borderRadius: '50%',
          }}
        />
        <input
          ref={ImageInputEl}
          onChange={handleProfileImage}
          type="file"
          name="profile-image"
          id="profile-image"
        ></input>
      </ImageContainer>
      <InfoContainer>
        <InfoLi>
          <InfoTitle htmlFor="email">이메일</InfoTitle>
          <span id="email">{email}</span>
        </InfoLi>
        <InfoLi>
          <InfoTitle htmlFor="name">이름</InfoTitle>
          <input id="name" value={name || ''} onChange={handleChangeName} />
        </InfoLi>
        <InfoLi>
          <InfoTitle htmlFor="sex">성별</InfoTitle>
          <UniSelectDropdown
            id="sex"
            title="성별"
            selectedItem={convertSex(sex || '')}
            items={defaultSex}
            onChange={setSex}
          />
        </InfoLi>
        <InfoLi>
          <InfoTitle htmlFor="position">포지션</InfoTitle>
          <UniSelectDropdown
            id="position"
            title="포지션"
            selectedItem={position || '없음'}
            items={defaultPositions}
            onChange={setPosition}
          />
        </InfoLi>
        <InfoLi vertical={true}>
          <InfoTitle htmlFor="techStack">기술 스택</InfoTitle>
          <MultiSelectDropdown
            id="techStack"
            items={[
              'TypeScript',
              'React',
              'JavaScript',
              'HTML5',
              'CSS3',
              'Spring',
              'Python',
              'D3',
            ]}
            selectedItems={techStacks}
            setSelectedItem={setTechStack}
          />
        </InfoLi>
        <InfoLi>
          <InfoTitle htmlFor="github">Github</InfoTitle>
          <input
            id="github"
            value={github || ''}
            onChange={handleChangeGithub}
          />
        </InfoLi>
        <InfoLi vertical={true}>
          <InfoTitle htmlFor="selfIntroduction">자기 소개 (200 자)</InfoTitle>
          <textarea
            id="selfIntroduction"
            maxLength={200}
            value={selfIntroduction || ''}
            onChange={handleChangeSelfIntroduction}
          ></textarea>
        </InfoLi>
      </InfoContainer>
      <ButtonWrapper>
        <PrimaryButton wFull>변경</PrimaryButton>
      </ButtonWrapper>
    </form>
  );
};

export default MyProfileChange;
