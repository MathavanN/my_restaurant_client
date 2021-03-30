export interface IGoodsReceivedNote {
  id: number;
  purchaseOrderId: number;
  purchaseOrderNumber: string;
  invoiceNumber: string;
  paymentTypeId: number;
  paymentTypeName: string;
  nbt: number;
  vat: number;
  discount: number;
  receivedBy: string;
  receivedUserName: string;
  receivedDate: Date;
  approvalStatus: string;
  approvedBy: string;
  approvedUserName: string;
  approvedDate: Date;
  approvalReason: string;
}

export interface IGoodsReceivedNoteSerial extends IGoodsReceivedNote {
  serial: number;
}
