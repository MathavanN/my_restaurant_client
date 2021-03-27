import { FC } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { SupplierFormValues } from '../../../app/models/supplier';
import EditSupplier from './EditSupplier';

interface IProps {
  hasModifyAccess: boolean;
  supplier: SupplierFormValues;
  openModal: (content: any) => void;
}
const SupplierListHeader: FC<IProps> = ({
  hasModifyAccess,
  supplier,
  openModal,
}) => (
  <>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Contact Person</Table.HeaderCell>
        {hasModifyAccess && (
          <Table.HeaderCell>
            <Button
              animated="vertical"
              color="green"
              onClick={() => openModal(<EditSupplier supplier={supplier} />)}
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
  </>
);

export default SupplierListHeader;
