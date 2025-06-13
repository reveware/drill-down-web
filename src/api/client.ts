import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'sonner';

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle errors and token refresh
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      const isLoginCall = originalRequest.url.includes('/auth/login');
      const unauthorized = error.response?.status === 401;

      if (unauthorized && !isLoginCall) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('auth_token');

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      return Promise.reject(error.response?.data);
    }
  );

  return client;
};

export const apiClient = createApiClient();
