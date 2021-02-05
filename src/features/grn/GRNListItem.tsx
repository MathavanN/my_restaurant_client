import React, { FC, Fragment } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { IGoodsReceivedNote } from "../../app/models/goodsReceivedNote";
import { format, isEqual } from "date-fns";
import { Link } from "react-router-dom";
import { PENDING } from "../../app/models/constants";

interface IProps {
  grns: [string, IGoodsReceivedNote][];
}
const GRNListItem: FC<IProps> = ({ grns }) => {
  return (
    <Fragment>
      <Table.Body>
        {grns.map(([group, grn]) => (
          <Table.Row key={grn.id}>
            <Table.Cell>{group}</Table.Cell>
            <Table.Cell>{grn.purchaseOrderNumber}</Table.Cell>
            <Table.Cell>{grn.invoiceNumber}</Table.Cell>
            <Table.Cell>{grn.paymentTypeName}</Table.Cell>
            <Table.Cell>{grn.nbt}</Table.Cell>
            <Table.Cell>{grn.vat}</Table.Cell>
            <Table.Cell>{grn.discount}</Table.Cell>
            <Table.Cell negative={grn.approvalStatus === PENDING}>
              {grn.approvalStatus}
            </Table.Cell>
            <Table.Cell>{grn.approvedUserName}</Table.Cell>
            <Table.Cell>
              {!isEqual(
                new Date(grn.approvedDate),
                new Date("0001-01-01T00:00:00")
              ) && format(new Date(grn.approvedDate), "yyyy-MM-dd'T'HH:mm")}
            </Table.Cell>
            <Table.Cell>
              <Button
                content="View"
                color="blue"
                as={Link}
                to={`/grn/view/${grn.id}`}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Fragment>
  );
};

export default GRNListItem;
