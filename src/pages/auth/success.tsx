import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/hooks';
import { signinOAuth } from 'src/redux/reducers/auth';

const Success = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      window.opener.location.reload();
      window.close();
    }
    const currentUrl = window.location.href;
    const searchParams = new URL(currentUrl).searchParams;
    const access = searchParams.get('access');
    const refresh = searchParams.get('refresh');

    if (access && refresh) {
      dispatch(signinOAuth({ access, refresh }));
    }
  }, [token, dispatch]);

  return <div>OAuth login</div>;
};

export default Success;
