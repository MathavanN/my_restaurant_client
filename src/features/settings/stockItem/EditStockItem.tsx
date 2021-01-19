import React, { FC, Fragment, useContext } from "react";
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

  const { register, errors, handleSubmit } = useForm({
    defaultValues: stockItem,
  });

  const onSubmit = (data: any) => {
    const formData = new CreateStockItem({ ...data, id: stockItem.id });
    if (formData.id === 0)
      createStockItem(formData).finally(() => closeModal());
    else updateStockItem(formData).finally(() => closeModal());
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {stockItem.id === 0 ? "Add new Stock Item" : "Modify Stock Item"}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Stock Type</label>
          <select
            ref={register({
              required: "Stock type is required",
            })}
            name="typeId"
            placeholder="Stock type"
          >
            {stockTypes.map((d) => (
              <option key={d.key} value={d.key}>
                {d.text}
              </option>
            ))}
          </select>

          {errors.typeId && (
            <Label basic color="red" pointing>
              {errors.typeId.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            ref={register({
              required: "Item Name is required",
              maxLength: {
                value: 250,
                message: "Item Name maximum characters 250",
              },
            })}
          />
          {errors.name && (
            <Label basic color="red" pointing>
              {errors.name.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Unit Of Measure</label>
          <select
            ref={register({
              required: "Unit of measure is required",
            })}
            name="unitOfMeasureId"
            placeholder="Unit Of Measure"
          >
            {unitOfMeasures.map((d) => (
              <option key={d.key} value={d.key}>
                {d.text}
              </option>
            ))}
          </select>
          {errors.unitOfMeasureId && (
            <Label basic color="red" pointing>
              {errors.unitOfMeasureId.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Item Unit</label>
          <input
            type="number"
            name="itemUnit"
            placeholder="Item Unit"
            ref={register({
              required: "Item unit is required",
              validate: {
                greaterThanZero: (value) =>
                  parseInt(value, 0) > 0
                    ? true
                    : "Item unit must be greater than zero",
              },
            })}
          />
          {errors.itemUnit && (
            <Label basic color="red" pointing>
              {errors.itemUnit.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Item Description</label>
          <textarea
            name="description"
            placeholder="Item Description"
            rows={4}
            ref={register({
              maxLength: {
                value: 500,
                message: "Description maximum characters 500",
              },
            })}
          />
          {errors.description && (
            <Label basic color="red" pointing>
              {errors.description.message}
            </Label>
          )}
        </Form.Field>
        <Button type="submit" color="teal" fluid>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default observer(EditStockItem);
