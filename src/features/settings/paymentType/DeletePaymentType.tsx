import { FC, useContext } from 'react';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IPaymentType } from '../../../app/models/paymentType';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';

interface IProps {
  paymentType: IPaymentType;
}
const DeletePaymentType: FC<IProps> = ({ paymentType }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deletePaymentType } = rootStore.paymentTypeStore;
  return (
    <>
      <Header icon='delete' content='Are you sure to delete?' color='red' />
      <Divider horizontal />
      <Modal.Content>
        <p>Payment Type: {paymentType.name}</p>
      </Modal.Content>
      <Divider horizontal />
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign='center'>
            <Button
              content='Yes'
              color='red'
              onClick={() => {
                deletePaymentType(paymentType.id)
                  .then(() => {
                    toast.success('Payment type deleted successfully');
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

export default observer(DeletePaymentType);
