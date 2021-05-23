/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios, { AxiosResponse } from 'axios'
import { IToken, ISignIn, IUser } from '../model/User.model';
import { IUnitOfMeasure } from '../model/UnitOfMeasure.model';
import { ACCESS_TOKEN } from '../config/constants'
import { IStockType } from '../model/StockType.model';
import { IStockItem, IStockItemEnvelop } from '../model/StockItem.model';

axios.defaults.baseURL = process.env.REACT_APP_RESTAURANT_API_URL;
axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(undefined, error => {
  console.log(error);

  throw error.response;
});
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  getByParams: (url: string, params: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
}

const User = {
  login: (signIn: ISignIn): Promise<IToken> => requests.post(`/v1/account/login`, signIn),
  current: (): Promise<IUser> => requests.get(`/v1/account/currentuser`)
}

const UnitOfMeasure = {
  list: (): Promise<IUnitOfMeasure[]> => requests.get(`/v1/unitOfMeasure`),
  create: (unitOfMeasure: IUnitOfMeasure): Promise<IUnitOfMeasure> =>
    requests.post(`/v1/unitOfMeasure`, unitOfMeasure),
  update: (unitOfMeasure: IUnitOfMeasure): Promise<IUnitOfMeasure> =>
    requests.put(`/v1/unitOfMeasure/${unitOfMeasure.id}`, unitOfMeasure),
  detail: (id: number): Promise<IUnitOfMeasure> =>
    requests.get(`/v1/unitOfMeasure/${id}`),
  delete: (id: number) => requests.del(`/v1/unitOfMeasure/${id}`),
}

const StockType = {
  list: (): Promise<IStockType[]> => requests.get(`/v1/stockType`),
  create: (stockType: IStockType): Promise<IStockType> =>
    requests.post(`/v1/stockType`, stockType),
  update: (stockType: IStockType): Promise<IStockType> =>
    requests.put(`/v1/stockType/${stockType.id}`, stockType),
  detail: (id: number): Promise<IStockType> =>
    requests.get(`/v1/stockType/${id}`),
  delete: (id: number) => requests.del(`/v1/stockType/${id}`),
};

const StockItem = {
  list: (typeId: number, params: URLSearchParams): Promise<IStockItemEnvelop> =>
    requests.getByParams(`/v1/stockItem/type/${typeId}`, params),
  listAll: (): Promise<IStockItem[]> => requests.get(`/v1/stockItem`),
  // create: (stockItem: CreateStockItem): Promise<IStockItem> =>
  //   requests.post(`/v1/stockItem`, stockItem),
  // update: (stockItem: CreateStockItem): Promise<IStockItem> =>
  //   requests.put(`/v1/stockItem/${stockItem.id}`, stockItem),
  detail: (id: number): Promise<IStockItem> =>
    requests.get(`/v1/stockItem/${id}`),
  delete: (id: number) => requests.del(`/v1/stockItem/${id}`),
};

const RestaurantApis = { User, UnitOfMeasure, StockType, StockItem };

export default RestaurantApis;