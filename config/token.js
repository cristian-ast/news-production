import { axiosBackendCliente } from './axios';

const tokenAuth = token => {
    if(token) {
        axiosBackendCliente.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axiosBackendCliente.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;