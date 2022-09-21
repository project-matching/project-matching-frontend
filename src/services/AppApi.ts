import axios from 'axios';

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:8080/v1'
      : 'http://ec2-3-39-79-163.ap-northeast-2.compute.amazonaws.com:8080/v1',
  timeout: 2500,
});
