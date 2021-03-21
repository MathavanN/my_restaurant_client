import { FC, Fragment } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { ISupplier, SupplierFormValues } from '../../../app/models/supplier';
import DeleteSupplier from './DeleteSupplier';
import EditSupplier from './EditSupplier';

interface IProps {
  hasModifyAccess: boolean;
  openModal: (content: any) => void;
  closeModal: () => void;
  suppliers: [string, ISupplier][];
}

const SupplierListItem: FC<IProps> = ({
  hasModifyAccess,
  suppliers,
  openModal,
  closeModal,
}) => {
  return (
    <Fragment>
      <Table.Body>
        {suppliers.map(([group, supplier]) => (
          <Table.Row key={supplier.id}>
            <Table.Cell>{group}</Table.Cell>
            <Table.Cell>{supplier.name}</Table.Cell>
            <Table.Cell>{supplier.address1}</Table.Cell>
            <Table.Cell>{supplier.telephone1}</Table.Cell>
            <Table.Cell>{supplier.email}</Table.Cell>
            <Table.Cell>{supplier.contactPerson}</Table.Cell>
            {hasModifyAccess && (
              <Table.Cell collapsing textAlign='right'>
                <Button
                  animated='vertical'
                  color='orange'
                  onClick={() =>
                    openModal(
                      <EditSupplier
                        supplier={new SupplierFormValues(supplier)}
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
                    openModal(
                      <DeleteSupplier
                        supplier={supplier}
                        closeModal={closeModal}
                      />
                    )
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
    </Fragment>
  );
};

export default SupplierListItem;
