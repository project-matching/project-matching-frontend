import axios from 'axios';

export const appApi = axios.create({
  baseURL: 'http://localhost:8080/v1',
  timeout: 2500,
});
