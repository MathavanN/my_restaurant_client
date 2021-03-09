import { FC, Fragment, useContext } from "react";
import { Button, Modal, Header, Grid, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { IPaymentType } from "../../../app/models/paymentType";
import { toast } from "react-toastify";
import ErrorMessage from "../../../app/common/alert/ErrorMessage";

interface IProps {
  paymentType: IPaymentType;
}
const DeletePaymentType: FC<IProps> = ({ paymentType }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deletePaymentType } = rootStore.settingsStore;
  return (
    <Fragment>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Payment Type: {paymentType.name}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deletePaymentType(paymentType.id)
                  .then(() => {
                    toast.success("Payment type deleted successfully");
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
    </Fragment>
  );
};

export default observer(DeletePaymentType);
