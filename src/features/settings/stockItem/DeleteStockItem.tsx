import { FC, useContext } from 'react';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IStockItem } from '../../../app/models/stockItem';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';

interface IProps {
  stockItem: IStockItem;
}
const DeleteStockItem: FC<IProps> = ({ stockItem }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteStockItem } = rootStore.stockItemStore;
  return (
    <>
      <Header icon='delete' content='Are you sure to delete?' color='red' />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Stock Item: {stockItem.name}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign='center'>
            <Button
              content='Yes'
              color='red'
              onClick={() => {
                deleteStockItem(stockItem.id)
                  .then(() => {
                    toast.success('Stock item deleted successfully');
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

export default observer(DeleteStockItem);
