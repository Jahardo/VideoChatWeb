import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

export const client = axios.create({
    baseURL: 'http://localhost:3003',
});
export const authClient = axios.create({
    baseURL: 'http://localhost:3003',
});
const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};
const authError = (e:AxiosError) => {
    console.error(`[request error] [${JSON.stringify(e)}]`);
    return Promise.reject(error);
};

authClient.interceptors.request.use(authInterceptor, authError);

export interface UserData {
    name?:string,
    password: string,
    email : string
}
