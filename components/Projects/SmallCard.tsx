import styled from '@emotion/styled';

const SmallCard = () => {
  const CardContainer = styled.div`
    margin: 10px 0;
    background-color: #ddd;
    padding: 10px;
  `;
  const H3 = styled.h3`
    font-size: 16px;
    font-weight: bold;
  `;
  return (
    <CardContainer>
      <H3>Project title</H3>
    </CardContainer>
  );
};

export default SmallCard;
