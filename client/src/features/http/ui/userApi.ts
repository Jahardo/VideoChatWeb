import axios, { AxiosError, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { authClient, client, UserData } from './AxiosProvider';

export const registration = async (user:UserData) => {
    let errors;
    const response = await client.post('api/user/registration', user)
        .then((res:AxiosResponse) => {
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
export const check = async () => {
    const { data } = await authClient.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
