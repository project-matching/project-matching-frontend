import axios from 'axios';

export const appApi = axios.create({
  baseURL:
    'http://ec2-3-39-79-163.ap-northeast-2.compute.amazonaws.com:8080/v1',
  timeout: 2500,
});
