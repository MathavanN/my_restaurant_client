import React, { FC, Fragment, useContext } from "react";
import { Button, Modal, Header, Grid, Divider } from "semantic-ui-react";
import { IUnitOfMeasure } from "../../../app/models/unitOfMeasure";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  unitOfMeasure: IUnitOfMeasure;
}
const DeleteUnitOfMeasure: FC<IProps> = ({ unitOfMeasure }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { deleteUnitOfMeasure } = rootStore.settingsStore;
  return (
    <Fragment>
      <Header icon="delete" content="Are you sure to delete?" color="red" />
      <Divider horizontal></Divider>
      <Modal.Content>
        <p>Unit Of Measure Code: {unitOfMeasure.code}</p>
      </Modal.Content>
      <Divider horizontal></Divider>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="center">
            <Button
              content="Yes"
              color="red"
              onClick={() =>
                deleteUnitOfMeasure(unitOfMeasure.id).then(() => closeModal())
              }
            />
            <Button content="No" color="green" onClick={() => closeModal()} />
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Fragment>
  );
};

export default observer(DeleteUnitOfMeasure);
