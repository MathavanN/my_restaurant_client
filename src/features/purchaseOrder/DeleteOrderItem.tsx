import { FC, useContext } from 'react';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IPurchaseOrderItem } from '../../app/models/purchaseOrderItem';

import ErrorMessage from '../../app/common/alert/ErrorMessage';

interface IProps {
  item: IPurchaseOrderItem;
}
const DeleteOrderItem: FC<IProps> = ({ item }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deletePurchaseOrderItem } = rootStore.purchaseOrderStore;
  return (
    <>
      <Header icon='delete' content='Are you sure to delete?' color='red' />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Item: {item.itemName}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign='center'>
            <Button
              content='Yes'
              color='red'
              onClick={() => {
                deletePurchaseOrderItem(item.id)
                  .then(() => {
                    toast.success('Item deleted successfully');
                    closeModal();
                  })
                  .catch((error) => {
                    toast.error(<ErrorMessage error={error} text='Error:' />);
                  });
              }}
            />
            <Button content='No' color='green' onClick={() => closeModal()} />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </>
  );
};

export default observer(DeleteOrderItem);
