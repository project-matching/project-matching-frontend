import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { authSuccess } from 'src/redux/reducers/auth';
import { updateUserInfo } from 'src/redux/reducers/users';
import { appApi } from 'src/services/AppApi';
import { TokenService } from 'src/services/TokenService';

const AuthComponent = () => {
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.auth.token);

  /**
   * TODO:
   * localStorage에 토큰이 존재할 경우 토큰 업데이트
   * 토큰이 만료되었을 경우 localStorage에서 토큰을 제거하고, 재로그인 요청
   * 로그아웃을 할 경우 유저 정보 초기화
   */
  useEffect(() => {
    if (localStorage !== undefined) {
      const storedToken = TokenService.get();
      dispatch(authSuccess(storedToken));
      appApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (!token) {
        return;
      }
      dispatch(updateUserInfo());
    }
  }, [token, dispatch]);

  return null;
};

export default AuthComponent;
