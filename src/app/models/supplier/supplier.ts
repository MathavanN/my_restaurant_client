export interface ISupplierEnvelop {
  suppliers: ISupplier[];
  supplierCount: number;
}
export interface ISupplier {
  id: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  telephone1: string;
  telephone2: string;
  fax: string;
  email: string;
  contactPerson: string;
}

export interface ISupplierSerial extends ISupplier {
  serial: number;
}