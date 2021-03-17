import axios, { AxiosResponse } from 'axios'
import { ITodo } from 'model/Todo.model';
import { IToken, IUser, IUserLogin } from 'model/User.model';
import { ACCESS_TOKEN } from 'utils/constants';
import { toast } from 'react-toastify';
import { IUnitOfMeasure, UnitOfMeasureFormValues } from 'model/UnitOfMeasure.model';
import history from 'historyy'
import { IStockType } from 'model/StockType.model';
import { CreateStockItem, IStockItem, IStockItemEnvelop } from 'model/stockItem.model';

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
    if (status === 401 && headers['www-authenticate'] !== undefined) {
        window.localStorage.removeItem(ACCESS_TOKEN)
        history.push('/')
        toast.info("Your session has expired, please login again", { toastId: "token_expired" })
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

const UOM = {
    list: (): Promise<IUnitOfMeasure[]> => requests.get(`/v1/unitofmeasure`),
    create: (unitOfMeasure: UnitOfMeasureFormValues): Promise<IUnitOfMeasure> => requests.post(`/v1/unitofmeasure`, unitOfMeasure),
    update: (unitOfMeasure: UnitOfMeasureFormValues): Promise<IUnitOfMeasure> => requests.put(`/v1/unitofmeasure/${unitOfMeasure.id}`, unitOfMeasure),
    detail: (id: number): Promise<IUnitOfMeasure> => requests.get(`/v1/unitofmeasure/${id}`),
    delete: (id: number) => requests.del(`/v1/unitofmeasure/${id}`),
}
const StockType = {
    list: (): Promise<IStockType[]> => requests.get(`/v1/stocktype`),
    create: (stockType: IStockType): Promise<IStockType> => requests.post(`/v1/stocktype`, stockType),
    update: (stockType: IStockType): Promise<IStockType> => requests.put(`/v1/stocktype/${stockType.id}`, stockType),
    detail: (id: number): Promise<IStockType> => requests.get(`/v1/stocktype/${id}`),
    delete: (id: number) => requests.del(`/v1/stocktype/${id}`),
}

const StockItem = {
    list: (typeId: number, params: URLSearchParams): Promise<IStockItemEnvelop> => requests.getByParams(`/v1/StockItem/type/${typeId}`, params),
    listAll: (): Promise<IStockItem[]> => requests.get(`/v1/StockItem`),
    create: (stockItem: CreateStockItem): Promise<IStockItem> => requests.post(`/v1/stockitem`, stockItem),
    update: (stockItem: CreateStockItem): Promise<IStockItem> => requests.put(`/v1/stockitem/${stockItem.id}`, stockItem),
    detail: (id: number): Promise<IStockItem> => requests.get(`/v1/stockitem/${id}`),
    delete: (id: number) => requests.del(`/v1/stockitem/${id}`)
}

const Todo = {
    list: (): Promise<ITodo[]> => requests.get(`/todos`)
}


const RestaurantApis = { User, UOM, StockType, StockItem, Todo };
export default RestaurantApis;