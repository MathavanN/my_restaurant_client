import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Icon, Table } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import DeleteStockType from './DeleteStockType';
import EditStockType from './EditStockType';
import { StockTypeFormValues } from '../../../app/models/stockType/stockTypeFormValues';

const StockTypeList = () => {
  const rootStore = useContext(RootStoreContext);
  const { getStockTypes } = rootStore.stockTypeStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;

  return (
    <>
      <Table compact celled striped color="red">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            {hasModifyAccess && (
              <Table.HeaderCell>
                <Button
                  animated="vertical"
                  color="green"
                  onClick={() =>
                    openModal(
                      <EditStockType stockType={new StockTypeFormValues()} />
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
          {getStockTypes.map((stockType) => (
            <Table.Row key={stockType.id}>
              <Table.Cell>{stockType.serial}</Table.Cell>
              <Table.Cell>{stockType.type}</Table.Cell>
              <Table.Cell>{stockType.description}</Table.Cell>
              {hasModifyAccess && (
                <Table.Cell collapsing textAlign="right">
                  <Button
                    animated="vertical"
                    color="orange"
                    onClick={() =>
                      openModal(
                        <EditStockType
                          stockType={new StockTypeFormValues(stockType)}
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
                      openModal(<DeleteStockType stockType={stockType} />)
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
    </>
  );
};

export default observer(StockTypeList);
