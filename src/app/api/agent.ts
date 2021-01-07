import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import history from '../../history'
import { CreateStockItem, IStockItem } from '../models/stockItem';
import { IStockType } from '../models/stockType';
import { IUnitOfMeasure } from '../models/unitOfMeasure';
import { IRefreshToken, IToken, IUser, IUserLogin } from '../models/user';

axios.defaults.baseURL = process.env.REACT_APP_RESTAURANT_API_URL;
axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(undefined, error => {
    if (error.message === "Network Error" && !error.response) {
        toast.error("network error")
    }
    const { status, data, config, headers } = error.response;

    if (status === 401) {
        window.localStorage.removeItem("jwt");
        history.push('/')
    }

    // if (status === 401 && headers['www-authenticate'].includes("invalid_token")) {
    //     console.log(error.response)
    //     //window.localStorage.removeItem("jwt")
    //     history.push('/')
    //     toast.info("Your session has expired, please login again")
    // }

    if (status === 404) {
        history.push('/dashboard');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/dashboard');
    }

    if (status === 409) {
        toast.error(data.errorMessage)
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!')
    }
    throw error.response
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData, { headers: { 'Content-type': 'multipart/form-data' } }).then(responseBody)
    }
}

const userV1Apis = {
    login: "/v1/account/login",
    currentUser: "/v1/account/currentuser",
    refresh: "/v1/Account/Refresh",
}
const Users = {
    current: (): Promise<IUser> => requests.get(userV1Apis.currentUser),
    login: (user: IUserLogin): Promise<IToken> => requests.post(userV1Apis.login, user),
    refresh: (token: IRefreshToken): Promise<IToken> => requests.post(userV1Apis.refresh, token),
    //register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user)
}

const UnitOfMeasure = {
    list: (): Promise<IUnitOfMeasure[]> => requests.get(`/v1/unitofmeasure`),
    create: (unitOfMeasure: IUnitOfMeasure): Promise<IUnitOfMeasure> => requests.post(`/v1/unitofmeasure`, unitOfMeasure),
    update: (unitOfMeasure: IUnitOfMeasure) => requests.put(`/v1/unitofmeasure/${unitOfMeasure.id}`, unitOfMeasure),
    detail: (id: number): Promise<IUnitOfMeasure> => requests.get(`/v1/unitofmeasure/${id}`),
    delete: (id: number) => requests.del(`/v1/unitofmeasure/${id}`),
}

const StockType = {
    list: (): Promise<IStockType[]> => requests.get(`/v1/stocktype`),
    create: (stockType: IStockType): Promise<IStockType> => requests.post(`/v1/stocktype`, stockType),
    update: (stockType: IStockType) => requests.put(`/v1/stocktype/${stockType.id}`, stockType),
    detail: (id: number): Promise<IStockType> => requests.get(`/v1/stocktype/${id}`),
    delete: (id: number) => requests.del(`/v1/stocktype/${id}`),
}

const StockItem = {
    list: (): Promise<IStockItem[]> => requests.get(`/v1/stockitem`),
    create: (stockItem: CreateStockItem): Promise<IStockItem> => requests.post(`/v1/stockitem`, stockItem),
    update: (stockItem: CreateStockItem) => requests.put(`/v1/stockitem/${stockItem.id}`, stockItem),
    detail: (id: number): Promise<IStockItem> => requests.get(`/v1/stockitem/${id}`),
    delete: (id: number) => requests.del(`/v1/stockitem/${id}`)
}

const RestaurantApis = { Users, UnitOfMeasure, StockType, StockItem }

export default RestaurantApis