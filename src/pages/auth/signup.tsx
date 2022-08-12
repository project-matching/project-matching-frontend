import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TokenService } from 'src/services/TokenService';
import { confirmEmailType, UserService } from 'src/services/UserService';

const Signup = () => {
  const router = useRouter();
  const { email, authToken } = router.query;

  const emailSignin = async ({ email, authToken }: confirmEmailType) => {
    try {
      const token: string = await UserService.confirmEmail({
        email,
        authToken,
      });

      if (!token) {
        return;
      }

      TokenService.set(token);
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
