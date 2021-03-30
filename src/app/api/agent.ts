import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import history from '../../history';
import { IGoodsReceivedNote } from '../models/goodsReceivedNote';
import { CreateGoodsReceivedNote } from '../models/createGoodsReceivedNote';
import { ApprovalGoodsReceivedNote } from '../models/approvalGoodsReceivedNote';
import { IGoodsReceivedNoteFreeItem } from '../models/goodsReceivedNoteFreeItem';
import { CreateGoodsReceivedNoteFreeItem } from '../models/createGoodsReceivedNoteFreeItem';
import { IGoodsReceivedNoteItem } from '../models/goodsReceivedNoteItem';
import { CreateGoodsReceivedNoteItem } from '../models/createGoodsReceivedNoteItem';
import { IPaymentType } from '../models/paymentType/paymentType';
import { IPurchaseOrder } from '../models/purchaseOrder/purchaseOrder';
import { ApprovalPurchaseOrder } from '../models/purchaseOrder/approvalPurchaseOrder';
import { CreatePurchaseOrder } from '../models/purchaseOrder/createPurchaseOrder';
import { IPurchaseOrderItem } from '../models/purchaseOrderItem/purchaseOrderItem';
import { IStockItem, IStockItemEnvelop } from '../models/stockItem/stockItem';
import { CreateStockItem } from '../models/stockItem/createStockItem';
import { IStockType } from '../models/stockType/stockType';
import { ISupplier, ISupplierEnvelop } from '../models/supplier/supplier';
import { IUnitOfMeasure } from '../models/unitOfMeasure/unitOfMeasure';
import {
  IAppUser,
  IRefreshToken,
  IRegisterAdminUser,
  IRegisterNonAdminUser,
  IRegisterResult,
  IToken,
  IUser,
  IUserLogin,
} from '../models/user';
import { CreatePurchaseOrderItem } from '../models/purchaseOrderItem/createPurchaseOrderItem';

axios.defaults.baseURL = process.env.REACT_APP_RESTAURANT_API_URL;
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('network error');
  }
  const { status, data, config, headers } = error.response;

  if (
    status === 401 &&
    headers['www-authenticate'] !== undefined &&
    headers['www-authenticate'].includes('invalid_token')
  ) {
    window.localStorage.removeItem('jwt');
    history.push('/');
    toast.info('Your session has expired, please login again');
  }

  if (status === 404) {
    history.push('/dashboard');
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    Object.prototype.hasOwnProperty.call(data.errors, 'id')
  ) {
    history.push('/dashboard');
  }

  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  getByParams: (url: string, params: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    const formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody);
  },
};

const Users = {
  list: (): Promise<IAppUser[]> => requests.get(`/v1/account/users`),
  current: (): Promise<IUser> => requests.get('/v1/account/currentUser'),
  login: (user: IUserLogin): Promise<IToken> =>
    requests.post('/v1/account/login', user),
  refresh: (token: IRefreshToken): Promise<IToken> =>
    requests.post('/v1/account/refresh', token),
  registerAdmin: (user: IRegisterAdminUser): Promise<IRegisterResult> =>
    requests.post(`/v1/account/registerAdminUser`, user),
  registerNonAdmin: (user: IRegisterNonAdminUser): Promise<IRegisterResult> =>
    requests.post(`/v1/account/registerNormalUser`, user),
};

const UnitOfMeasure = {
  list: (): Promise<IUnitOfMeasure[]> => requests.get(`/v1/unitOfMeasure`),
  create: (unitOfMeasure: IUnitOfMeasure): Promise<IUnitOfMeasure> =>
    requests.post(`/v1/unitOfMeasure`, unitOfMeasure),
  update: (unitOfMeasure: IUnitOfMeasure): Promise<IUnitOfMeasure> =>
    requests.put(`/v1/unitOfMeasure/${unitOfMeasure.id}`, unitOfMeasure),
  detail: (id: number): Promise<IUnitOfMeasure> =>
    requests.get(`/v1/unitOfMeasure/${id}`),
  delete: (id: number) => requests.del(`/v1/unitOfMeasure/${id}`),
};

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

const PaymentType = {
  list: (): Promise<IPaymentType[]> => requests.get(`/v1/paymentType`),
  create: (paymentType: IPaymentType): Promise<IPaymentType> =>
    requests.post(`/v1/paymentType`, paymentType),
  update: (paymentType: IPaymentType): Promise<IPaymentType> =>
    requests.put(`/v1/paymentType/${paymentType.id}`, paymentType),
  detail: (id: number): Promise<IPaymentType> =>
    requests.get(`/v1/paymentType/${id}`),
  delete: (id: number) => requests.del(`/v1/paymentType/${id}`),
};

const StockItem = {
  list: (typeId: number, params: URLSearchParams): Promise<IStockItemEnvelop> =>
    requests.getByParams(`/v1/stockItem/type/${typeId}`, params),
  listAll: (): Promise<IStockItem[]> => requests.get(`/v1/stockItem`),
  create: (stockItem: CreateStockItem): Promise<IStockItem> =>
    requests.post(`/v1/stockItem`, stockItem),
  update: (stockItem: CreateStockItem): Promise<IStockItem> =>
    requests.put(`/v1/stockItem/${stockItem.id}`, stockItem),
  detail: (id: number): Promise<IStockItem> =>
    requests.get(`/v1/stockItem/${id}`),
  delete: (id: number) => requests.del(`/v1/stockItem/${id}`),
};

const Supplier = {
  list: (params: URLSearchParams): Promise<ISupplierEnvelop> =>
    requests.getByParams(`/v1/supplier`, params),
  create: (supplier: ISupplier): Promise<ISupplier> =>
    requests.post(`/v1/supplier`, supplier),
  update: (supplier: ISupplier): Promise<ISupplier> =>
    requests.put(`/v1/supplier/${supplier.id}`, supplier),
  detail: (id: number): Promise<ISupplier> =>
    requests.get(`/v1/supplier/${id}`),
  delete: (id: number) => requests.del(`/v1/supplier/${id}`),
};

const PurchaseOrder = {
  list: (): Promise<IPurchaseOrder[]> => requests.get(`/v1/purchaseOrder`),
  listPOForGRN: (): Promise<IPurchaseOrder[]> =>
    requests.get(`/v1/purchaseOrder/grnAllowed`),
  create: (order: CreatePurchaseOrder): Promise<IPurchaseOrder> =>
    requests.post(`/v1/purchaseOrder`, order),
  detail: (id: number): Promise<IPurchaseOrder> =>
    requests.get(`/v1/purchaseOrder/${id}`),
  update: (order: CreatePurchaseOrder): Promise<IPurchaseOrder> =>
    requests.put(`/v1/purchaseOrder/${order.id}`, order),
  delete: (id: number) => requests.del(`/v1/purchaseOrderItem/${id}`),
  approval: (order: ApprovalPurchaseOrder): Promise<IPurchaseOrder> =>
    requests.put(`/v1/purchaseOrder/approval/${order.id}`, order),
};

const PurchaseOrderItem = {
  list: (params: URLSearchParams): Promise<IPurchaseOrderItem[]> =>
    requests.getByParams(`/v1/purchaseOrderItem`, params),
  create: (item: CreatePurchaseOrderItem): Promise<IPurchaseOrderItem> =>
    requests.post(`/v1/purchaseOrderItem`, item),
  detail: (id: number): Promise<IPurchaseOrderItem> =>
    requests.get(`/v1/purchaseOrderItem/${id}`),
  update: (item: CreatePurchaseOrderItem): Promise<IPurchaseOrderItem> =>
    requests.put(`/v1/purchaseOrderItem/${item.id}`, item),
  delete: (id: number) => requests.del(`/v1/purchaseOrderItem/${id}`),
};

const GRN = {
  list: (): Promise<IGoodsReceivedNote[]> =>
    requests.get(`/v1/goodsReceivedNote`),
  create: (grn: CreateGoodsReceivedNote): Promise<IGoodsReceivedNote> =>
    requests.post(`/v1/goodsReceivedNote`, grn),
  detail: (id: number): Promise<IGoodsReceivedNote> =>
    requests.get(`/v1/goodsReceivedNote/${id}`),
  update: (grn: CreateGoodsReceivedNote): Promise<IGoodsReceivedNote> =>
    requests.put(`/v1/goodsReceivedNote/${grn.id}`, grn),
  approval: (grn: ApprovalGoodsReceivedNote): Promise<IGoodsReceivedNote> =>
    requests.put(`/v1/goodsReceivedNote/approval/${grn.id}`, grn),
};

const GRNItem = {
  list: (params: URLSearchParams): Promise<IGoodsReceivedNoteItem[]> =>
    requests.getByParams(`/v1/goodsReceivedNoteItem`, params),
  detail: (id: number): Promise<IGoodsReceivedNoteItem> =>
    requests.get(`/v1/goodsReceivedNoteItem/${id}`),
  create: (
    item: CreateGoodsReceivedNoteItem
  ): Promise<IGoodsReceivedNoteItem> =>
    requests.post(`/v1/goodsReceivedNoteItem`, item),
  update: (item: CreateGoodsReceivedNoteItem) =>
    requests.put(`/v1/goodsReceivedNoteItem/${item.id}`, item),
  delete: (id: number) => requests.del(`/v1/goodsReceivedNoteItem/${id}`),
};

const GRNFreeItem = {
  list: (params: URLSearchParams): Promise<IGoodsReceivedNoteFreeItem[]> =>
    requests.getByParams(`/v1/goodsReceivedNoteFreeItem`, params),
  detail: (id: number): Promise<IGoodsReceivedNoteFreeItem> =>
    requests.get(`/v1/goodsReceivedNoteFreeItem/${id}`),
  create: (
    item: CreateGoodsReceivedNoteFreeItem
  ): Promise<IGoodsReceivedNoteFreeItem> =>
    requests.post(`/v1/goodsReceivedNoteFreeItem`, item),
  update: (
    item: CreateGoodsReceivedNoteFreeItem
  ): Promise<IGoodsReceivedNoteFreeItem> =>
    requests.put(`/v1/goodsReceivedNoteFreeItem/${item.id}`, item),
  delete: (id: number) => requests.del(`/v1/goodsReceivedNoteFreeItem/${id}`),
};

const RestaurantApis = {
  Users,
  UnitOfMeasure,
  StockType,
  PaymentType,
  StockItem,
  Supplier,
  PurchaseOrder,
  PurchaseOrderItem,
  GRN,
  GRNItem,
  GRNFreeItem,
};

export default RestaurantApis;
