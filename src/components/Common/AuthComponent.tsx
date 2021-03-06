import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from 'src/redux/reducers/users';
import { TokenService } from 'src/services/TokenService';

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
