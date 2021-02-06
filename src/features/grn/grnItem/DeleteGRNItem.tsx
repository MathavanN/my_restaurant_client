import React, { FC, Fragment, useContext } from "react";
import { Button, Modal, Header, Grid, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IGoodsReceivedNoteItem } from "../../../app/models/goodsReceivedNoteItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ErrorMessage from "../../../app/common/alert/ErrorMessage";
import { toast } from "react-toastify";

interface IProps {
  item: IGoodsReceivedNoteItem;
}
const DeleteGRNItem: FC<IProps> = ({ item }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteGRNItem } = rootStore.grnStore;
  return (
    <Fragment>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Item: {item.itemName}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() => {
                deleteGRNItem(item.id)
                  .then(() => {
                    toast.success("Item deleted successfully");
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

export default observer(DeleteGRNItem);
