export interface IPurchaseOrder {
  id: number;
  orderNumber: string;
  supplierId: number;
  supplierName: string;
  requestedUserId: string;
  requestedUserName: string;
  requestedDate: Date;
  approvalStatus: string;
  approvedUserId: string;
  approvedUserName: string;
  approvedDate: Date;
  description: string;
}
