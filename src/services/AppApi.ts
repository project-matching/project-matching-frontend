import axios from 'axios';

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:8080/v1'
      : 'http://ec2-3-39-79-163.ap-northeast-2.compute.amazonaws.com:8080/v1',
  timeout: 2500,
});

// 응답 인터셉터 추가하기
appApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const code = error.code;
    const status = error.response?.status;

    if (code === 'ECONNABORTED' || status === 408) {
      alert('요청이 만료되었습니다.');
    }
    return Promise.reject(error);
  }
);
