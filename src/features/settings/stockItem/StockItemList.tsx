import React, { FC, Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Button, Icon, Table } from "semantic-ui-react";
import DeleteStockItem from "./DeleteStockItem";

interface IProps {
  setEditForm: (value: boolean) => void;
  setCreate: (value: boolean) => void;
  setEdit: (value: boolean) => void;
}

const StockItemList: FC<IProps> = ({ setEditForm, setCreate, setEdit }) => {
  const rootStore = useContext(RootStoreContext);
  const { getStockItems, loadStockItem } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const handleEditMode = (id: number) => {
    loadStockItem(id);
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
            <Table.HeaderCell>Stock Type</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>UOM Code</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getStockItems.map(([group, stockItem]) => (
            <Table.Row key={stockItem.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{stockItem.stockType}</Table.Cell>
              <Table.Cell>{stockItem.name}</Table.Cell>
              <Table.Cell>{stockItem.unitOfMeasureCode}</Table.Cell>
              <Table.Cell>{stockItem.description}</Table.Cell>
              <Table.Cell collapsing textAlign="right">
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() => handleEditMode(stockItem.id)}
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
                    openModal(<DeleteStockItem stockItem={stockItem} />)
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
            <Table.HeaderCell colSpan="6">
              <Button
                floated="right"
                primary
                onClick={() => handleCreateMode()}
              >
                Add Stock Item
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Fragment>
  );
};

export default observer(StockItemList);
