import { format, isEqual } from "date-fns";
import React, { FC } from "react";
import { Grid, Table } from "semantic-ui-react";
import { APPROVED } from "../../app/models/constants";
import { IGoodsReceivedNote } from "../../app/models/goodsReceivedNote";

interface IProps {
  grn: IGoodsReceivedNote;
}
const GRNSummary: FC<IProps> = ({ grn }) => {
  const positive = grn.approvalStatus === APPROVED && true;
  const negative = grn.approvalStatus !== APPROVED && true;
  const isDefaultDate = (date: Date) => {
    return isEqual(new Date(date), new Date("0001-01-01T00:00:00"));
  };
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Purchase Order</Table.Cell>
                <Table.Cell>{grn.purchaseOrderNumber}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Invoice Number</Table.Cell>
                <Table.Cell>{grn.invoiceNumber}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Payment Type</Table.Cell>
                <Table.Cell>{grn.paymentTypeName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>NBT %</Table.Cell>
                <Table.Cell>
                  {grn.nbt}
                  {"%"}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>VAT %</Table.Cell>
                <Table.Cell>
                  {grn.vat}
                  {"%"}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Discount %</Table.Cell>
                <Table.Cell>
                  {grn.discount}
                  {"%"}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell positive={positive} negative={negative}>
                  GRN Status
                </Table.Cell>
                <Table.Cell positive={positive} negative={negative}>
                  {grn.approvalStatus}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Received By</Table.Cell>
                <Table.Cell>{grn.receivedUserName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Received Date</Table.Cell>
                <Table.Cell>
                  {!isDefaultDate(grn.receivedDate) &&
                    format(new Date(grn.receivedDate), "yyyy-MM-dd'T'HH:mm")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approved By</Table.Cell>
                <Table.Cell>{grn.approvedUserName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approved Date</Table.Cell>
                <Table.Cell>
                  {!isDefaultDate(grn.approvedDate) &&
                    format(new Date(grn.approvedDate), "yyyy-MM-dd'T'HH:mm")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approval Reason</Table.Cell>
                <Table.Cell>{grn.approvalReason}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GRNSummary;
