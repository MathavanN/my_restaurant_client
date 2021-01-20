import React, { FC, Fragment, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import {
  PurchaseOrderFormValues,
  CreatePurchaseOrder,
} from "../../app/models/purchaseOrder";
import { ISelectInputOptions } from "../../app/models/common";

interface IProps {
  order: PurchaseOrderFormValues;
  supplierOptions: ISelectInputOptions[];
}

const AddPurchaseOrder: FC<IProps> = ({ order, supplierOptions }) => {
  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: order,
  });
  const rootStore = useContext(RootStoreContext);
  const {
    createPurchaseOrder,
    updatePurchaseOrder,
  } = rootStore.purchaseOrderStore;
  const { closeModal } = rootStore.modalStore;

  const onSubmit = (data: any) => {
    const formData = new CreatePurchaseOrder({ ...data, id: order.id });
    console.log(formData);
    if (formData.id === 0)
      createPurchaseOrder(formData).finally(() => closeModal());
    else updatePurchaseOrder(formData).finally(() => closeModal());
  };
  useEffect(() => {
    register(
      { name: "supplierId" },
      {
        required: true,
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "Supplier is required",
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
      { name: "description" },
      {
        maxLength: {
          value: 500,
          message: "UOM description maximum characters 500",
        },
      }
    );
  }, [register]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {order.id === 0
              ? "Create new purchase order"
              : "Modify purchase order"}
          </Header.Subheader>
        </Header>
        <Form.Select
          name="supplierId"
          fluid
          options={supplierOptions}
          label="Supplier"
          placeholder="Select supplier"
          defaultValue={order.supplierId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.supplierId && (
              <Label basic color="red" pointing>
                {errors.supplierId.message}
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
          defaultValue={order.discount}
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
        <Form.TextArea
          label="Order Description"
          name="description"
          placeholder="Order description..."
          defaultValue={order.description}
          rows={4}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.description && (
              <Label basic color="red" pointing>
                {errors.description.message}
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

export default AddPurchaseOrder;
