import React, { FC, Fragment, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import {
  CreatePurchaseOrderItem,
  PurchaseOrderItemFormValues,
} from "../../app/models/purchaseOrderItem";
import { ISelectInputOptions } from "../../app/models/common";

interface IProps {
  item: PurchaseOrderItemFormValues;
  stockTypeOptions: ISelectInputOptions[];
}
const CreateOrderItem: FC<IProps> = ({ item, stockTypeOptions }) => {
  const { register, errors, handleSubmit, setValue, trigger, watch } = useForm({
    defaultValues: item,
  });
  const rootStore = useContext(RootStoreContext);
  const {
    createPurchaseOrderItem,
    updatePurchaseOrderItem,
  } = rootStore.purchaseOrderStore;
  const { closeModal } = rootStore.modalStore;
  const { getFilteredStockItems } = rootStore.stockItemStore;

  const onSubmit = (data: any) => {
    const formData = new CreatePurchaseOrderItem({ ...data, id: item.id });
    console.log(formData);
    if (formData.id === 0)
      createPurchaseOrderItem(formData).finally(() => closeModal());
    else updatePurchaseOrderItem(formData).finally(() => closeModal());
  };
  const itemTypeSelected = watch("itemTypeId");
  useEffect(() => {
    register(
      { name: "itemTypeId" },
      {
        required: "Item type is required",
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "Item type is required",
        },
      }
    );
    register(
      { name: "quantity" },
      {
        required: "Quantity is required",
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 0) > 0
              ? true
              : "Quantity must be greater than zero",
        },
      }
    );
    register(
      { name: "itemId" },
      {
        required: true,
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "Item is required",
        },
      }
    );
    register(
      { name: "discount" },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 0) >= 0
              ? true
              : "Discount must be a positive number",
        },
      }
    );
    register(
      { name: "itemUnitPrice" },
      {
        required: "Item unit price is required",
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 0) > 0
              ? true
              : "Item unit price must be greater than zero",
        },
      }
    );
  }, [register]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {item.id === 0 ? "Add new Item" : "Modify Item"}
          </Header.Subheader>
        </Header>
        <Form.Select
          name="itemTypeId"
          fluid
          options={stockTypeOptions}
          label="Item Type"
          placeholder="Select item type"
          defaultValue={item.itemTypeId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.itemTypeId && (
              <Label basic color="red" pointing>
                {errors.itemTypeId.message}
              </Label>
            )
          }
        />
        {itemTypeSelected > 0 && (
          <Form.Select
            name="itemId"
            fluid
            search
            selection
            options={getFilteredStockItems(itemTypeSelected)}
            label="Item Name"
            placeholder="Select an item"
            defaultValue={item.itemId}
            onChange={async (e, { name, value }) => {
              setValue(name, value);
              await trigger(name);
            }}
            error={
              errors.itemId && (
                <Label basic color="red" pointing>
                  {errors.itemId.message}
                </Label>
              )
            }
          />
        )}

        <Form.Input
          name="itemUnitPrice"
          type="number"
          fluid
          label="Unit Price"
          placeholder="Unit price"
          defaultValue={item.itemUnitPrice}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.itemUnitPrice && (
              <Label basic color="red" pointing>
                {errors.itemUnitPrice.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="quantity"
          type="number"
          fluid
          label="Quantity"
          placeholder="Quantity"
          defaultValue={item.quantity}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.quantity && (
              <Label basic color="red" pointing>
                {errors.quantity.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="discount"
          type="number"
          fluid
          label="Discount (%)"
          placeholder="Discount"
          defaultValue={item.discount}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.discount && (
              <Label basic color="red" pointing>
                {errors.discount.message}
              </Label>
            )
          }
        />
        <Button type="submit" color="teal" fluid>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default CreateOrderItem;
