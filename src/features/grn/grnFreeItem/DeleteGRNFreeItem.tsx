import { FC, useContext } from 'react';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';
import { IGoodsReceivedNoteFreeItem } from '../../../app/models/goodsReceivedNoteFreeItem/goodsReceivedNoteFreeItem';
import { ToastIds } from '../../../app/models/constants';

interface IProps {
  item: IGoodsReceivedNoteFreeItem;
}
const DeleteGRNFreeItem: FC<IProps> = ({ item }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteGRNFreeItem } = rootStore.grnStore;
  return (
    <>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal />
      <Modal.Content>
        <p>GRN Free Item: {item.itemName}</p>
      </Modal.Content>
      <Divider horizontal />
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deleteGRNFreeItem(item.id)
                  .then(() => {
                    closeModal();
                    toast.success('Item deleted successfully', {
                      toastId: ToastIds.GRN_FREE_ITEM.DELETE_SUCCESS_ID,
                    });
                  })
                  .catch((error) => {
                    toast.error(<ErrorMessage error={error} text="Error:" />, {
                      toastId: ToastIds.GRN_FREE_ITEM.DELETE_ERROR_ID,
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

export default observer(DeleteGRNFreeItem);
