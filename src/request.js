import { Toast } from 'vant';
import axios from 'axios'
import baseConfig from './config.js'
import Cookies from 'js-cookie'
import router from './router'


// create an axios instance
const service = axios.create({
    baseURL: baseConfig.baseUrl, // url = base url + request url
// withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
});
// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        Toast.loading({
            message: 'Loading...'
        })
        if (Cookies.get('token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = Cookies.get('token')
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return false
    }

);

// response interceptor
service.interceptors.response.use(

    response => {
        Toast.clear();
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
            if (res.code === 401) {
                Cookies.remove('token');
                router.push('/login')
            } else {
                Toast.fail(res.message);
            }
            return res

        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Toast.fail('The server is error');
    }
)

export default service