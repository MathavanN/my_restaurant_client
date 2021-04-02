import { FC, useContext } from 'react';
import { Button, Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { IUnitOfMeasure } from '../../../app/models/unitOfMeasure/unitOfMeasure';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';
import { ToastIds } from '../../../app/models/constants';

interface IProps {
  unitOfMeasure: IUnitOfMeasure;
}
const DeleteUnitOfMeasure: FC<IProps> = ({ unitOfMeasure }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteUnitOfMeasure } = rootStore.unitOfMeasureStore;

  return (
    <>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal />
      <Modal.Content>
        <p>Unit Of Measure Code: {unitOfMeasure.code}</p>
      </Modal.Content>
      <Divider horizontal />
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deleteUnitOfMeasure(unitOfMeasure.id)
                  .then(() => {
                    closeModal();
                    toast.success('UOM deleted successfully', {
                      toastId: ToastIds.UOM.DELETE_SUCCESS_ID,
                    });
                  })
                  .catch((error) => {
                    toast.error(<ErrorMessage error={error} text="Error:" />, {
                      toastId: ToastIds.UOM.DELETE_ERROR_ID,
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

export default observer(DeleteUnitOfMeasure);
