import axios, { AxiosResponse } from 'axios'
import { ITodo } from 'model/Todo.model';
import { IToken, IUser, IUserLogin } from 'model/User.model';
import { ACCESS_TOKEN } from 'utils/constants';

axios.defaults.baseURL = process.env.REACT_APP_RESTAURANT_API_URL;

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(ACCESS_TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(undefined, error => {
    if (error.message === "Network Error" && !error.response) {
        throw error.message
    }
    const { status, data, config, headers } = error.response;
    if (status === 401 && headers['www-authenticate'] !== undefined && headers['www-authenticate'].includes("invalid_token")) {
        window.localStorage.removeItem(ACCESS_TOKEN)
        //history.push('/')
        //toast.info("Your session has expired, please login again")
    }

    // if (status === 404) {
    //     history.push('/dashboard');
    // }
    // if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
    //     history.push('/dashboard');
    // }

    // if (status === 500) {
    //     toast.error('Server error - check the terminal for more info!')
    // }
    throw error.response
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    getByParams: (url: string, params: URLSearchParams) => axios.get(url, { params: params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const User = {
    login: (user: IUserLogin): Promise<IToken> => requests.post('/v1/account/login', user),
    current: (): Promise<IUser> => requests.get('/v1/account/currentuser')
}

const Todo = {
    list: (): Promise<ITodo[]> => requests.get(`/todos`)
}


const RestaurantApis = { User, Todo };
export default RestaurantApis;