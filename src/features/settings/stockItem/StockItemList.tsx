import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Button, Icon, Table } from "semantic-ui-react";
import DeleteStockItem from "./DeleteStockItem";
import EditStockItem from "./EditStockItem";
import { StockItemFormValues } from "../../../app/models/stockItem";

const StockItemList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    getStockItems,
    loadStockTypeOptions,
    loadUnitOfMeasureOptions,
  } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;

  return (
    <Fragment>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Stock Type</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            {hasModifyAccess && (
              <Table.HeaderCell>
                <Button
                  animated="vertical"
                  color="green"
                  onClick={() =>
                    openModal(
                      <EditStockItem
                        stockItem={new StockItemFormValues()}
                        stockTypes={loadStockTypeOptions}
                        unitOfMeasures={loadUnitOfMeasureOptions}
                      />
                    )
                  }
                >
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="add circle" />
                  </Button.Content>
                </Button>
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getStockItems.map(([group, stockItem]) => (
            <Table.Row key={stockItem.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{stockItem.stockType}</Table.Cell>
              <Table.Cell>{stockItem.name}</Table.Cell>
              <Table.Cell>
                {stockItem.itemUnit}
                {stockItem.unitOfMeasureCode}
              </Table.Cell>
              <Table.Cell>{stockItem.description}</Table.Cell>
              {hasModifyAccess && (
                <Table.Cell collapsing textAlign="right">
                  <Button
                    animated="vertical"
                    color="orange"
                    onClick={() =>
                      openModal(
                        <EditStockItem
                          stockItem={new StockItemFormValues(stockItem)}
                          stockTypes={loadStockTypeOptions}
                          unitOfMeasures={loadUnitOfMeasureOptions}
                        />
                      )
                    }
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
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default observer(StockItemList);
