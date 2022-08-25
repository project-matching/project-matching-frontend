import axios from 'axios';

export const appApi = axios.create({
  baseURL: '/api/v1',
  timeout: 2500,
});
