import { useContext } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import DeleteUnitOfMeasure from './DeleteUnitOfMeasure';
import EditUnitOfMeasure from './EditUnitOfMeasure';
import { UnitOfMeasureFormValues } from '../../../app/models/unitOfMeasure';

const UnitOfMeasureList = () => {
  const rootStore = useContext(RootStoreContext);
  const { getUnitOfMeasures } = rootStore.unitOfMeasureStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;

  return (
    <>
      <Table compact celled striped color='red'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            {hasModifyAccess && (
              <Table.HeaderCell>
                <Button
                  animated='vertical'
                  color='green'
                  onClick={() =>
                    openModal(
                      <EditUnitOfMeasure uom={new UnitOfMeasureFormValues()} />
                    )
                  }
                >
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name='add circle' />
                  </Button.Content>
                </Button>
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getUnitOfMeasures.map(([group, uom]) => (
            <Table.Row key={uom.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{uom.code}</Table.Cell>
              <Table.Cell>{uom.description}</Table.Cell>
              {hasModifyAccess && (
                <Table.Cell collapsing textAlign='right'>
                  <Button
                    animated='vertical'
                    color='orange'
                    onClick={() =>
                      openModal(
                        <EditUnitOfMeasure
                          uom={new UnitOfMeasureFormValues(uom)}
                        />
                      )
                    }
                  >
                    <Button.Content hidden>Edit</Button.Content>
                    <Button.Content visible>
                      <Icon name='edit' />
                    </Button.Content>
                  </Button>

                  <Button
                    animated='vertical'
                    color='red'
                    onClick={() =>
                      openModal(<DeleteUnitOfMeasure unitOfMeasure={uom} />)
                    }
                  >
                    <Button.Content hidden>Delete</Button.Content>
                    <Button.Content visible>
                      <Icon name='delete' />
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

export default observer(UnitOfMeasureList);
