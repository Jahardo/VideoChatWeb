import axios, { AxiosError, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { trackForMutations } from '@reduxjs/toolkit/dist/immutableStateInvariantMiddleware';
import { authClient, client, UserData } from './AxiosProvider';

export const registration = async (user:UserData) => {
    let errors;
    let data;
    const response = await client.post('api/user/registration', user)
        .then((res:AxiosResponse) => {
            data = jwtDecode(res.data.token);
            localStorage.setItem('token', res.data.token);
        })
        .catch((e:AxiosError) => {
            const temp:HTMLDivElement = document.createElement('div');
            temp.innerHTML = e.response.data as string;
            errors = temp.getElementsByTagName('pre')[0].innerHTML.split('<br')[0];
        });
    if (errors) {
        return errors;
    }
    return data;
};
export const login = async (user:UserData) => {
    let errors;
    let data;
    const response = await client.post('api/user/login', user)
        .then((res:AxiosResponse) => {
            data = jwtDecode(res.data.token);
            localStorage.setItem('token', res.data.token);
        })
        .catch((e:AxiosError) => {
            const temp:HTMLDivElement = document.createElement('div');
            temp.innerHTML = e.response.data as string;
            errors = temp.getElementsByTagName('pre')[0].innerHTML.split('<br')[0];
        });
    if (errors) {
        return errors;
    }
    return data;
};
export const checkAuth = async () => {
    let data;
    await authClient.get('api/user/auth')
        .then((res:AxiosResponse) => {
            localStorage.setItem('token', res.data.token);
            data = jwtDecode(res.data.token);
        })
        .catch((e:AxiosError) => {
            console.log(e.message);
        });
    return data;
};

export const changeImg = async (file:any) => {
    let data;
    const formData = new FormData();
    formData.append('img', file);
    await authClient.post('api/user/changeImg', formData)
        .then((res:AxiosResponse) => {
            localStorage.setItem('token', res.data.token);
            data = jwtDecode(res.data.token);
            console.log(res.data.token);
        })
        .catch((e:AxiosError) => {
            console.log(e.message);
        });
    return data;
};
