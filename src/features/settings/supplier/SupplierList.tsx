import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Button, Icon, Table } from "semantic-ui-react";
import DeleteSupplier from "./DeleteSupplier";
import EditSupplier from "./EditSupplier";
import { SupplierFormValues } from "../../../app/models/supplier";

const SupplierList = () => {
  const rootStore = useContext(RootStoreContext);
  const { getSuppliers } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;

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
            {hasModifyAccess && (
              <Table.HeaderCell>
                <Button
                  animated="vertical"
                  color="green"
                  onClick={() =>
                    openModal(
                      <EditSupplier supplier={new SupplierFormValues()} />
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
          {getSuppliers.map(([group, supplier]) => (
            <Table.Row key={supplier.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{supplier.name}</Table.Cell>
              <Table.Cell>{supplier.address1}</Table.Cell>
              <Table.Cell>{supplier.telephone1}</Table.Cell>
              <Table.Cell>{supplier.email}</Table.Cell>
              <Table.Cell>{supplier.contactPerson}</Table.Cell>
              {hasModifyAccess && (
                <Table.Cell collapsing textAlign="right">
                  <Button
                    animated="vertical"
                    color="orange"
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
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default observer(SupplierList);
