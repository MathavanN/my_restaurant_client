import { FC, useContext } from 'react';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IStockType } from '../../../app/models/stockType/stockType';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';
import { ToastIds } from '../../../app/models/constants';

interface IProps {
  stockType: IStockType;
}
const DeleteStockType: FC<IProps> = ({ stockType }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteStockType } = rootStore.stockTypeStore;
  return (
    <>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal />
      <Modal.Content>
        <p>Stock Type: {stockType.type}</p>
      </Modal.Content>
      <Divider horizontal />
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deleteStockType(stockType.id)
                  .then(() => {
                    closeModal();
                    toast.success('Stock type deleted successfully', {
                      toastId: ToastIds.STOCK_TYPE.DELETE_SUCCESS_ID,
                    });
                  })
                  .catch((error) => {
                    toast.error(<ErrorMessage error={error} text="Error:" />, {
                      toastId: ToastIds.STOCK_TYPE.DELETE_ERROR_ID,
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

export default observer(DeleteStockType);
