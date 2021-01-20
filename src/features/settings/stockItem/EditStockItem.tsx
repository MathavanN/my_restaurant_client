import React, { FC, Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {
  CreateStockItem,
  StockItemFormValues,
} from "../../../app/models/stockItem";
import { ISelectInputOptions } from "../../../app/models/common";

interface IProps {
  stockItem: StockItemFormValues;
  stockTypes: ISelectInputOptions[];
  unitOfMeasures: ISelectInputOptions[];
}

const EditStockItem: FC<IProps> = ({
  stockItem,
  stockTypes,
  unitOfMeasures,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { createStockItem, updateStockItem } = rootStore.settingsStore;
  const { closeModal } = rootStore.modalStore;

  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: stockItem,
  });

  const onSubmit = (data: any) => {
    const formData = new CreateStockItem({ ...data, id: stockItem.id });
    console.log(formData);
    if (formData.id === 0)
      createStockItem(formData).finally(() => closeModal());
    else updateStockItem(formData).finally(() => closeModal());
  };

  useEffect(() => {
    register(
      { name: "name" },
      {
        required: "Item name is required",
        maxLength: {
          value: 250,
          message: "Item name maximum characters 250",
        },
      }
    );
    register(
      { name: "typeId" },
      {
        required: true,
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "Stock type is required",
        },
      }
    );
    register(
      { name: "unitOfMeasureId" },
      {
        required: true,
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "Unit of measure is required",
        },
      }
    );
    register(
      { name: "itemUnit" },
      {
        required: "Item unit is required",
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 0) > 0
              ? true
              : "Item unit must be greater than zero",
        },
      }
    );
    register(
      { name: "description" },
      {
        maxLength: {
          value: 500,
          message: "Description maximum characters 500",
        },
      }
    );
  }, [register]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {stockItem.id === 0 ? "Add new Stock Item" : "Modify Stock Item"}
          </Header.Subheader>
        </Header>
        <Form.Select
          name="typeId"
          fluid
          options={stockTypes}
          label="Stock Type"
          placeholder="Select stock type"
          defaultValue={stockItem.typeId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.typeId && (
              <Label basic color="red" pointing>
                {errors.typeId.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="name"
          fluid
          label="Item Name"
          placeholder="Item name"
          defaultValue={stockItem.name}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.name && (
              <Label basic color="red" pointing>
                {errors.name.message}
              </Label>
            )
          }
        />
        <Form.Select
          name="unitOfMeasureId"
          fluid
          options={unitOfMeasures}
          label="Unit Of Measure"
          placeholder="Select unit of measure"
          defaultValue={stockItem.unitOfMeasureId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.unitOfMeasureId && (
              <Label basic color="red" pointing>
                {errors.unitOfMeasureId.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="itemUnit"
          type="number"
          fluid
          label="Item Unit"
          placeholder="Item unit"
          defaultValue={stockItem.itemUnit}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.itemUnit && (
              <Label basic color="red" pointing>
                {errors.itemUnit.message}
              </Label>
            )
          }
        />
        <Form.TextArea
          label="Item Description"
          name="description"
          placeholder="Item description..."
          defaultValue={stockItem.description}
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

export default observer(EditStockItem);
