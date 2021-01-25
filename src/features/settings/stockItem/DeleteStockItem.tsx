import React, { FC, Fragment, useContext } from "react";
import { Button, Modal, Header, Grid, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { IStockItem } from "../../../app/models/stockItem";

interface IProps {
  stockItem: IStockItem;
}
const DeleteStockItem: FC<IProps> = ({ stockItem }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteStockItem } = rootStore.stockItemStore;
  return (
    <Fragment>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Stock Item: {stockItem.name}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() =>
                deleteStockItem(stockItem.id).then(() => closeModal())
              }
            />
            <Button content="No" color="green" onClick={() => closeModal()} />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Fragment>
  );
};

export default observer(DeleteStockItem);
