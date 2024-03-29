import { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { IAppUserSerial } from '../../app/models/user';

interface IProps {
  users: IAppUserSerial[];
}
const UserListItem: FC<IProps> = ({ users }) => (
  <Table compact celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Phone Number</Table.HeaderCell>
        <Table.HeaderCell>Access Roles</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {users.map((user) => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.serial}</Table.Cell>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.phoneNumber}</Table.Cell>
          <Table.Cell>{user.roles.join(', ')}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default UserListItem;
