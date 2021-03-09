import { FC, Fragment, useContext } from "react";
import { Button, Modal, Header, Grid, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { IStockType } from "../../../app/models/stockType";
import { toast } from "react-toastify";
import ErrorMessage from "../../../app/common/alert/ErrorMessage";

interface IProps {
  stockType: IStockType;
}
const DeleteStockType: FC<IProps> = ({ stockType }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteStockType } = rootStore.settingsStore;
  return (
    <Fragment>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Stock Type: {stockType.type}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deleteStockType(stockType.id)
                  .then(() => {
                    toast.success("Stock type deleted successfully");
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

export default observer(DeleteStockType);
