import React, { FC, Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Button, Icon, Table } from "semantic-ui-react";
import DeleteStockType from "./DeleteStockType";

interface IProps {
  setEditForm: (value: boolean) => void;
  setCreate: (value: boolean) => void;
  setEdit: (value: boolean) => void;
}

const StockTypeList: FC<IProps> = ({ setEditForm, setCreate, setEdit }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadStockType, getStockTypes } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const handleEditMode = (id: number) => {
    loadStockType(id);
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
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getStockTypes.map(([group, stockType]) => (
            <Table.Row key={stockType.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{stockType.type}</Table.Cell>
              <Table.Cell>{stockType.description}</Table.Cell>
              <Table.Cell collapsing textAlign="right">
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() => handleEditMode(stockType.id)}
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
                    openModal(<DeleteStockType stockType={stockType} />)
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
                Add Stock Type
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Fragment>
  );
};

export default observer(StockTypeList);
