import { FC, useContext } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { format, isEqual } from 'date-fns';
import { Link } from 'react-router-dom';
import { PENDING } from '../../app/models/constants';
import { RootStoreContext } from '../../app/stores/rootStore';
import AddGRN from './AddGRN';
import { IGoodsReceivedNoteSerial } from '../../app/models/goodsReceivedNote/goodsReceivedNote';
import { CreateGoodsReceivedNote } from '../../app/models/goodsReceivedNote/createGoodsReceivedNote';

interface IProps {
  goodsReceivedNotes: IGoodsReceivedNoteSerial[];
  displayColumn: boolean;
  displayView: boolean;
  displayEdit: boolean;
}
const GRNListItem: FC<IProps> = ({
  goodsReceivedNotes,
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
    <>
      <Table.Body>
        {goodsReceivedNotes.map((goodsReceivedNote) => (
          <Table.Row key={goodsReceivedNote.id}>
            {displayColumn && (
              <Table.Cell>{goodsReceivedNote.serial}</Table.Cell>
            )}
            <Table.Cell>{goodsReceivedNote.purchaseOrderNumber}</Table.Cell>
            <Table.Cell>{goodsReceivedNote.invoiceNumber}</Table.Cell>
            <Table.Cell>{goodsReceivedNote.paymentTypeName}</Table.Cell>
            <Table.Cell>{goodsReceivedNote.nbt}</Table.Cell>
            <Table.Cell>{goodsReceivedNote.vat}</Table.Cell>
            <Table.Cell>{goodsReceivedNote.discount}</Table.Cell>
            <Table.Cell negative={goodsReceivedNote.approvalStatus === PENDING}>
              {goodsReceivedNote.approvalStatus}
            </Table.Cell>
            {displayColumn && (
              <Table.Cell>{goodsReceivedNote.approvedUserName}</Table.Cell>
            )}
            {displayColumn && (
              <Table.Cell>
                {!isEqual(
                  new Date(goodsReceivedNote.approvedDate),
                  new Date('0001-01-01T00:00:00')
                ) &&
                  format(
                    new Date(goodsReceivedNote.approvedDate),
                    "yyyy-MM-dd'T'HH:mm"
                  )}
              </Table.Cell>
            )}
            {displayView && (
              <Table.Cell>
                <Button
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/grn/view/${goodsReceivedNote.id}`}
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
                        goodsReceivedNote={
                          new CreateGoodsReceivedNote(goodsReceivedNote)
                        }
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
    </>
  );
};

export default observer(GRNListItem);
