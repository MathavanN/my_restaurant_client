import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ISupplier } from '../../../app/models/supplier';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';

interface IProps {
  supplier: ISupplier;
  closeModal: () => void;
}
const DeleteSupplier: FC<IProps> = ({ supplier, closeModal }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteSupplier } = rootStore.supplierStore;
  return (
    <>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal />
      <Modal.Content>
        <p>Supplier Name: {supplier.name}</p>
      </Modal.Content>
      <Divider horizontal />
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deleteSupplier(supplier.id)
                  .then(() => {
                    toast.success('Supplier deleted successfully');
                    closeModal();
                  })
                  .catch((error) => {
                    toast.error(<ErrorMessage error={error} text="Error:" />);
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

export default observer(DeleteSupplier);
