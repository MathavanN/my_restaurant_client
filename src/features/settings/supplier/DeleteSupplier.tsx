import React, { FC, Fragment, useContext } from "react";
import { Button, Modal, Header, Grid, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { ISupplier } from "../../../app/models/supplier";

interface IProps {
  supplier: ISupplier;
  closeModal: () => void;
}
const DeleteSupplier: FC<IProps> = ({ supplier, closeModal }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteSupplier } = rootStore.supplierStore;
  return (
    <Fragment>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Supplier Name: {supplier.name}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() =>
                deleteSupplier(supplier.id).then(() => closeModal())
              }
            />
            <Button content="No" color="green" onClick={() => closeModal()} />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Fragment>
  );
};

export default observer(DeleteSupplier);
