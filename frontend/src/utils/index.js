import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://172.16.2.170:8099',
    timeout: 500000,
})
   instance.interceptors.request.use( config => {
    return config
}, err => {
    console.log(err)
    return Promise.reject(err)
} ); 



instance.interceptors.response.use( config => {

    return config
}, err => {
    console.log(err);
    return Promise.reject(err)
} );


export default instance


