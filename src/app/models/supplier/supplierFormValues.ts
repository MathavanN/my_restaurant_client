import { ISupplier } from './supplier';

export class SupplierFormValues {
  id: number = 0;

  name: string = '';

  address1: string = '';

  address2: string = '';

  city: string = '';

  country: string = '';

  telephone1: string = '';

  telephone2: string = '';

  fax: string = '';

  email: string = '';

  contactPerson: string = '';

  constructor(init?: ISupplier) {
    Object.assign(this, init);
  }
}
