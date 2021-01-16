import React, { Fragment, FC } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import {
  combineValidators,
  composeValidators,
  isNumeric,
  createValidator,
  isRequired,
} from "revalidate";
import SelectInput from "../../app/common/form/SelectInput";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useContext } from "react";
import {
  CreatePurchaseOrderItem,
  PurchaseOrderItemFormValues,
} from "../../app/models/purchaseOrderItem";

const isGreaterThan = (n: number) =>
  createValidator(
    (message) => (value) => {
      if (value && Number(value) <= n) {
        return message;
      }
    },
    (field) => `${field} must be greater than ${n}`
  );

const isGreaterThanOrEqual = (n: number) =>
  createValidator(
    (message) => (value) => {
      if (value && Number(value) < n) {
        return message;
      }
    },
    (field) => `${field} must be greater than ${n}`
  );

const validate = combineValidators({
  quantity: composeValidators(
    isRequired("Quantity"),
    isNumeric({ message: "Quantity must be a positive number" }),
    isGreaterThan(0)({ message: "Quantity must be greater than zero" })
  )(),
  itemUnitPrice: composeValidators(
    isRequired("Unit price"),
    isGreaterThan(0)({ message: "Unit price must be greater than zero" })
  )(),
  itemId: isRequired("Item Name"),
  discount: composeValidators(
    isGreaterThanOrEqual(0)({ message: "Discount must be a positive number" })
  )(),
});

interface IProps {
  item: PurchaseOrderItemFormValues;
}
const CreateOrderItem: FC<IProps> = ({ item }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submittingItem,
    createPurchaseOrderItem,
    updatePurchaseOrderItem,
  } = rootStore.purchaseOrderStore;
  const { closeModal } = rootStore.modalStore;
  const {
    loadStockTypeOptions,
    getFilteredStockItems,
  } = rootStore.settingsStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...formData } = values;
    const item = new CreatePurchaseOrderItem(formData);
    if (item.id === 0)
      createPurchaseOrderItem(item).finally(() => closeModal());
    else updatePurchaseOrderItem(item).finally(() => closeModal());
  };

  return (
    <Fragment>
      <FinalForm
        validate={validate}
        initialValues={item}
        onSubmit={handleFinalFormSubmit}
        render={({
          handleSubmit,
          invalid,
          pristine,
          dirtySinceLastSubmit,
          values,
        }) => (
          <Form onSubmit={handleSubmit} error>
            <Header as="h2" color="teal" textAlign="center">
              <Header.Subheader>Add new Item</Header.Subheader>
            </Header>
            <Field
              name="itemTypeId"
              label="Item Type"
              options={loadStockTypeOptions}
              placeholder="Select an item type"
              value={item.itemName}
              component={SelectInput as any}
            />
            {values.itemTypeId !== 0 && (
              <Field
                name="itemId"
                label="Item Name"
                options={getFilteredStockItems(values.itemTypeId)}
                placeholder="Select an item"
                value={item.itemName}
                component={SelectInput as any}
              />
            )}
            <Field
              name="itemUnitPrice"
              label="Unit Price"
              component={TextInput as any}
              placeholder="Unit price"
              value={item.itemUnitPrice}
            />
            <Field
              name="quantity"
              label="Quantity"
              component={TextInput as any}
              placeholder="Quantity"
              value={item.quantity}
            />
            <Field
              name="discount"
              label="Discount (%)"
              component={TextInput as any}
              placeholder="Discount"
              value={item.discount}
            />
            <Button
              loading={submittingItem}
              positive
              content="Save"
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            />
            <Button content="Cancel" onClick={closeModal} />
          </Form>
        )}
      />
    </Fragment>
  );
};

export default CreateOrderItem;
