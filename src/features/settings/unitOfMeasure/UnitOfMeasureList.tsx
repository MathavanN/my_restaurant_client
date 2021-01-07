import React, { Fragment, useContext, FC } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Button, Icon, Table } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import DeleteUnitOfMeasure from "./DeleteUnitOfMeasure";

interface IProps {
  setEditForm: (value: boolean) => void;
  setCreate: (value: boolean) => void;
  setEdit: (value: boolean) => void;
}
const UnitOfMeasureList: FC<IProps> = ({ setEditForm, setCreate, setEdit }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadUnitOfMeasure, getUnitOfMeasures } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const handleEditMode = (id: number) => {
    loadUnitOfMeasure(id);
    setEditForm(true);
    setCreate(false);
    setEdit(true);
  };

  const handleCreateMode = () => {
    setEditForm(true);
    setCreate(true);
    setEdit(false);
  };
  return (
    <Fragment>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getUnitOfMeasures.map(([group, uom]) => (
            <Table.Row key={uom.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{uom.code}</Table.Cell>
              <Table.Cell>{uom.description}</Table.Cell>
              <Table.Cell collapsing textAlign="right">
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() => handleEditMode(uom.id)}
                >
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name="edit" />
                  </Button.Content>
                </Button>
                <Button
                  animated="vertical"
                  color="red"
                  onClick={() =>
                    openModal(<DeleteUnitOfMeasure unitOfMeasure={uom} />)
                  }
                >
                  <Button.Content hidden>Delete</Button.Content>
                  <Button.Content visible>
                    <Icon name="delete" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                primary
                onClick={() => handleCreateMode()}
              >
                Add Unit Of Measure
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Fragment>
  );
};

export default observer(UnitOfMeasureList);
