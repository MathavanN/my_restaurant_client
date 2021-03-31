export class ApprovalGoodsReceivedNote {
  id: number = 0;

  approvalStatus: string = '';

  approvalReason: string = '';

  constructor(id: number, status: string, reason: string) {
    this.id = id;
    this.approvalStatus = status;
    this.approvalReason = reason;
  }
}
