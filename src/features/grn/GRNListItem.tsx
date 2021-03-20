import { FC, Fragment, useContext } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import {
  CreateGoodsReceivedNote,
  IGoodsReceivedNote,
} from "../../app/models/goodsReceivedNote";
import { format, isEqual } from "date-fns";
import { Link } from "react-router-dom";
import { PENDING } from "../../app/models/constants";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import AddGRN from "./AddGRN";

interface IProps {
  grns: [string, IGoodsReceivedNote][];
  displayColumn: boolean;
  displayView: boolean;
  displayEdit: boolean;
}
const GRNListItem: FC<IProps> = ({
  grns,
  displayEdit,
  displayView,
  displayColumn,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { loadPaymentTypeOptions } = rootStore.paymentTypeStore;
  const { loadAppUsersOptions, isSuperAdminUser } = rootStore.userStore;
  const { loadApprovedPurchaseOrdersOptions } = rootStore.purchaseOrderStore;
  return (
    <Fragment>
      <Table.Body>
        {grns.map(([group, grn]) => (
          <Table.Row key={grn.id}>
            {displayColumn && <Table.Cell>{group}</Table.Cell>}
            <Table.Cell>{grn.purchaseOrderNumber}</Table.Cell>
            <Table.Cell>{grn.invoiceNumber}</Table.Cell>
            <Table.Cell>{grn.paymentTypeName}</Table.Cell>
            <Table.Cell>{grn.nbt}</Table.Cell>
            <Table.Cell>{grn.vat}</Table.Cell>
            <Table.Cell>{grn.discount}</Table.Cell>
            <Table.Cell negative={grn.approvalStatus === PENDING}>
              {grn.approvalStatus}
            </Table.Cell>
            {displayColumn && <Table.Cell>{grn.approvedUserName}</Table.Cell>}
            {displayColumn && (
              <Table.Cell>
                {!isEqual(
                  new Date(grn.approvedDate),
                  new Date("0001-01-01T00:00:00")
                ) && format(new Date(grn.approvedDate), "yyyy-MM-dd'T'HH:mm")}
              </Table.Cell>
            )}
            {displayView && (
              <Table.Cell>
                <Button
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/grn/view/${grn.id}`}
                />
              </Table.Cell>
            )}
            {displayEdit && isSuperAdminUser && (
              <Table.Cell>
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() =>
                    openModal(
                      <AddGRN
                        goodsReceivedNote={new CreateGoodsReceivedNote(grn)}
                        purchaseOrderOptions={loadApprovedPurchaseOrdersOptions}
                        paymentTypeOptions={loadPaymentTypeOptions}
                        userOptions={loadAppUsersOptions}
                      />
                    )
                  }
                >
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name="edit" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Fragment>
  );
};

export default observer(GRNListItem);
