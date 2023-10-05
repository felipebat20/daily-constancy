import axios, { AxiosInstance } from 'axios';

import { jwtToken } from '@/hooks/verify_api';

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: { Authorization: `Bearer ${jwtToken()}` }
});

export default httpClient;
