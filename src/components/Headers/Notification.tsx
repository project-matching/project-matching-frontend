import styled from '@emotion/styled';

const Notification = () => {
  const Container = styled.div`
    width: 25px;
    height: 25px;
    margin: 0 10px;
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/OOjs_UI_icon_bell.svg/1200px-OOjs_UI_icon_bell.svg.png');
    background-size: cover;
    position: relative;
  `;

  return <Container></Container>;
};

export default Notification;
