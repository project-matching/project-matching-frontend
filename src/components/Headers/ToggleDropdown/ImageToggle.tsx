import styled from '@emotion/styled';
import Image from 'next/image';

export const DEFAULT_IMAGE: string = '/default_profile.png';

const ImageContainer = styled.div`
  cursor: pointer;
`;

interface Props {
  image: string | null;
  alt: string;
  size?: string;
  borderRadius?: boolean;
  toggleDropdown: () => void;
}

const ImageToggle = ({
  image,
  alt,
  size = '40px',
  borderRadius = false,
  toggleDropdown,
}: Props) => {
  return (
    <ImageContainer onClick={toggleDropdown}>
      <Image
        src={image || DEFAULT_IMAGE}
        alt={alt}
        width={size}
        height={size}
        style={{
          borderRadius: borderRadius ? '50%' : '',
        }}
      />
    </ImageContainer>
  );
};

export default ImageToggle;
