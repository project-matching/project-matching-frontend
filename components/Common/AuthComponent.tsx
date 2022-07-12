import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from 'redux/reducers/auth';
import { TokenService } from 'services/TokenService';

const AuthComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage !== undefined) {
      const storedToken = TokenService.get();
      if (storedToken) {
        const [email, password] = storedToken.split('+');
        dispatch(
          signin({
            email,
            password,
          })
        );
      }
    }
  });

  return null;
};

export default AuthComponent;
