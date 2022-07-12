import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from 'redux/reducers/users';
import { TokenService } from 'services/TokenService';

const AuthComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage !== undefined) {
      const storedToken = TokenService.get();
      if (!storedToken) {
        return;
      }
      dispatch(getUserInfo());
    }
  });

  return null;
};

export default AuthComponent;
