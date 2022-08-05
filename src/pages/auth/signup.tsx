import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Signup = () => {
  /**
   * TODO:
   * 1. 이메일 + 토큰 확인
   * 2. 확인한 토큰을 서버에 전송 (유효성 확인)
   * 3-1. 만료된 토큰일 경우 에러 페이지로 이동 (인증 유효기간이 지났습니다.)
   * 
    {
      "error": {
          "timestamp": "2022-08-05T17:05:28.2831746",
          "status": 500,
          "error": "INTERNAL_SERVER_ERROR",
          "code": "DUPLICATE_EMAIL_EXCEPTION",
          "message": [
              "Duplicated Email"
          ]
      },
      "data": false
    }
   * 3-2. 유효한 토큰일 경우 되받은 로그인 토큰 (jwt)을 저장

    {
    "error": null,
    "data": "jwttoken.blahalbh"
    }
    
   * 4. welcome 페이지로 이동
   *
   */

  const router = useRouter();
  const { email, authToken } = router.query;

  useEffect(() => {
    if (email && authToken) {
      // 서버로 해당 토큰 전송
      // endpoint: /v1/user/confirm (email, authToken 필요)
    }
  });
  return <div>이메일 인증</div>;
};

export default Signup;
