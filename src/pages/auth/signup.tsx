import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TokenType } from 'src/redux/reducers/auth';
import { TokenService } from 'src/services/TokenService';
import { confirmEmailType, UserService } from 'src/services/UserService';

const Signup = () => {
  const router = useRouter();
  const { email, authToken } = router.query;

  const emailSignin = async ({ email, authToken }: confirmEmailType) => {
    try {
      const { access, refresh, access_exp }: TokenType =
        await UserService.confirmEmail({
          email,
          authToken,
        });

      if (!access) {
        return;
      }

      TokenService.set(access);
      TokenService.setRefresh(refresh);
      TokenService.setExp(access_exp);
      router.push('/welcome');
    } catch (error: any) {
      router.push({
        pathname: '/auth/signup-fail',
        query: { email },
      });
    }
  };

  useEffect(() => {
    if (
      email &&
      authToken &&
      typeof email === 'string' &&
      typeof authToken === 'string'
    ) {
      emailSignin({ email, authToken });
    }
  });
  return <div>이메일 인증</div>;
};

export default Signup;
