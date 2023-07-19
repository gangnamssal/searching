import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const delay = 100;

const CancelToken = axios.CancelToken;

let cancel: (() => void) | undefined;

const config: AxiosRequestConfig = {
  baseURL: `http://localhost:4000`,
  timeout: 5000,
};

const Axios = axios.create(config);

const error = (error: Error) => {
  return Promise.reject(error);
};

Axios.interceptors.request.use((config) => {
  if (cancel) {
    cancel();
  }
  config.cancelToken = new CancelToken((c) => {
    cancel = c;
  });

  return new Promise<InternalAxiosRequestConfig>((resolve) => setTimeout(() => resolve(config), delay));
}, error);

Axios.interceptors.response.use(
  (response) => {
    cancel = undefined;
    return response;
  },
  (error) => {
    cancel = undefined;
    return Promise.reject(error);
  }
);

export default Axios;
