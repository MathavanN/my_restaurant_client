import { FC, useContext } from 'react';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IPurchaseOrderItem } from '../../app/models/purchaseOrderItem/purchaseOrderItem';
import ErrorMessage from '../../app/common/alert/ErrorMessage';
import { ToastIds } from '../../app/models/constants';

interface IProps {
  item: IPurchaseOrderItem;
}
const DeleteOrderItem: FC<IProps> = ({ item }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deletePurchaseOrderItem } = rootStore.purchaseOrderStore;
  return (
    <>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal />
      <Modal.Content>
        <p>Item: {item.itemName}</p>
      </Modal.Content>
      <Divider horizontal />
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deletePurchaseOrderItem(item.id)
                  .then(() => {
                    closeModal();
                    toast.success('Item deleted successfully', {
                      toastId: ToastIds.ORDER_ITEM.DELETE_SUCCESS_ID,
                    });
                  })
                  .catch((error) => {
                    toast.error(<ErrorMessage error={error} text="Error:" />, {
                      toastId: ToastIds.ORDER_ITEM.DELETE_ERROR_ID,
                    });
                  });
              }}
            />
            <Button content="No" color="green" onClick={() => closeModal()} />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </>
  );
};

export default observer(DeleteOrderItem);
