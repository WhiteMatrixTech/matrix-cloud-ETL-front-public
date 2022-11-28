import axios, { AxiosError, AxiosRequestHeaders } from 'axios';

const serviceBasePath = 'https://api.alpha.matrixlabs.com/etl/api/';

const axiosInstance = axios.create({
  baseURL: serviceBasePath
});

export interface ResponseBody<R> {
  code: string;
  message: string;
  status: string;
  data: R;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const { headers, ...rest } = config;
    return {
      ...rest,
      headers: { ...headers }
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ResponseBody<null>>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorMsg = (error as AxiosError<ResponseBody<any>>).response?.data;
    if (errorMsg) throw errorMsg;
    throw error;
  }
);

export function getData<P, T>(
  url: string,
  params?: P,
  headers?: AxiosRequestHeaders
) {
  return axiosInstance
    .get(url, { params, ...headers })
    .then(function (response: { data: T }) {
      return response.data;
    });
}

export function postData<D, T>(
  url: string,
  data: D,
  headers?: AxiosRequestHeaders
): Promise<T> {
  return axiosInstance
    .post(`${url}`, data, { headers })
    .then(function (response: { data: T }) {
      return response.data;
    });
}

export default axiosInstance;
