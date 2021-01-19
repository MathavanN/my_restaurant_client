import React, { FC, Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { StockTypeFormValues } from "../../../app/models/stockType";

interface IProps {
  stockType: StockTypeFormValues;
}
const EditStockType: FC<IProps> = ({ stockType }) => {
  const rootStore = useContext(RootStoreContext);
  const { updateStockType, createStockType } = rootStore.settingsStore;

  const { closeModal } = rootStore.modalStore;

  const { register, errors, handleSubmit } = useForm({
    defaultValues: stockType,
  });
  const onSubmit = (data: any) => {
    const formData = new StockTypeFormValues({ ...data, id: stockType.id });
    if (formData.id === 0)
      createStockType(formData).finally(() => closeModal());
    else updateStockType(formData).finally(() => closeModal());
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {stockType.id === 0 ? "Create Stock Type" : "Modify Stock Type"}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>UOM Code</label>
          <input
            type="text"
            name="type"
            placeholder="Stock Type"
            ref={register({
              required: "Stock type is required",
              maxLength: {
                value: 50,
                message: "Stock type maximum characters 50",
              },
            })}
          />
          {errors.type && (
            <Label basic color="red" pointing>
              {errors.type.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>UOM Description</label>
          <textarea
            name="description"
            placeholder="Stock Type Description"
            rows={2}
            ref={register({
              maxLength: {
                value: 100,
                message: "Description maximum characters 100",
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

export default observer(EditStockType);
