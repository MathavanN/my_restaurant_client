import React, { FC, Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Button, Icon, Table } from "semantic-ui-react";
import DeleteSupplier from "./DeleteSupplier";

interface IProps {
  setEditForm: (value: boolean) => void;
  setCreate: (value: boolean) => void;
  setEdit: (value: boolean) => void;
}

const SupplierList: FC<IProps> = ({ setEditForm, setCreate, setEdit }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadSupplier, getSuppliers } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const handleEditMode = (id: number) => {
    loadSupplier(id);
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
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Contact Person</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getSuppliers.map(([group, supplier]) => (
            <Table.Row key={supplier.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{supplier.name}</Table.Cell>
              <Table.Cell>{supplier.address1}</Table.Cell>
              <Table.Cell>{supplier.telephone1}</Table.Cell>
              <Table.Cell>{supplier.email}</Table.Cell>
              <Table.Cell>{supplier.contactPerson}</Table.Cell>
              <Table.Cell collapsing textAlign="right">
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() => handleEditMode(supplier.id)}
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
                    openModal(<DeleteSupplier supplier={supplier} />)
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
            <Table.HeaderCell colSpan="7">
              <Button
                floated="right"
                primary
                onClick={() => handleCreateMode()}
              >
                Add Supplier
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Fragment>
  );
};

export default observer(SupplierList);
