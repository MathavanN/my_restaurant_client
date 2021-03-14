import axios, { AxiosResponse } from 'axios'
import { Todo } from '../features/todo/todoSlice'

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

axios.interceptors.request.use((config) => {
    return config;
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(undefined, error => {
    if (error.message === "Network Error" && !error.response) {
        throw error.message
    }
    const { status, data, config, headers } = error.response;

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

const TodoAPI = {
    list: (): Promise<Todo[]> => requests.get(`/todos`)
}


const RestaurantApis = { TodoAPI };
export default RestaurantApis;