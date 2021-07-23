import axios from 'axios';

const axiosClient = axios.create({
    baseURL : "https://somossfm.herokuapp.com"
});

export const axiosBackendCliente = axios.create({
    baseURL : "https://somossfm.herokuapp.com"
});

export default axiosClient;