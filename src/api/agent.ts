/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios, { AxiosResponse } from 'axios'
import { IToken, ISignIn, IUser } from '../model/User.model';
import { IUnitOfMeasure } from '../model/UnitOfMeasure.model';
import { ACCESS_TOKEN } from '../utils/constants'

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
  list: (): Promise<IUnitOfMeasure[]> => requests.get(`/v1/unitofmeasure`),
  detail: (id: number): Promise<IUnitOfMeasure> => requests.get(`/v1/unitofmeasure/${id}`),
}
const RestaurantApis = { User, UnitOfMeasure };

export default RestaurantApis;