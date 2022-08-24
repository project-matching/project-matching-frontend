import axios from 'axios';

export const appApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 2500,
});
