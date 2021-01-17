import React, { FC, Fragment, useContext } from "react";
import { Button, Modal, Header, Grid, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IPurchaseOrderItem } from "../../app/models/purchaseOrderItem";

interface IProps {
  item: IPurchaseOrderItem;
}
const DeleteOrderItem: FC<IProps> = ({ item }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deletePurchaseOrderItem } = rootStore.purchaseOrderStore;
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
              onClick={() =>
                deletePurchaseOrderItem(item.id).then(() => closeModal())
              }
            />
            <Button content="No" color="green" onClick={() => closeModal()} />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Fragment>
  );
};

export default observer(DeleteOrderItem);
