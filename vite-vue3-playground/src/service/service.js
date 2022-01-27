import axios from 'axios';
//import {useMsgbox, Message} from 'element3'
import store from '@/store';
import {getToken} from '@/utils/auth';

const axioService = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000
});

axioService.interceptors.request.use(
    config => {
        if (store.getters.toke) {
            config.headers['X-Token'] = getToken()
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

axioService.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) {
            console.error('API error: ', res.message);
            return Promise.reject(new Error(res.message || 'Unknown Error'));
        } else {
            return res;
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default axioService