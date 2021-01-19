import React, { FC, Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import { UnitOfMeasureFormValues } from "../../../app/models/unitOfMeasure";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  uom: UnitOfMeasureFormValues;
}

const EditUnitOfMeasure: FC<IProps> = ({ uom }) => {
  const rootStore = useContext(RootStoreContext);
  const { updateUnitOfMeasure, createUnitOfMeasure } = rootStore.settingsStore;
  const { closeModal } = rootStore.modalStore;

  const { register, errors, handleSubmit } = useForm({ defaultValues: uom });
  const onSubmit = (data: any) => {
    const formData = new UnitOfMeasureFormValues({ ...data, id: uom.id });
    if (formData.id === 0)
      createUnitOfMeasure(formData).finally(() => closeModal());
    else updateUnitOfMeasure(formData).finally(() => closeModal());
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {uom.id === 0 ? "Create Unit Of Measure" : "Modify Unit Of Measure"}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>UOM Code</label>
          <input
            type="text"
            name="code"
            placeholder="UOM Code"
            ref={register({
              required: "UOM code is required",
              maxLength: {
                value: 20,
                message: "Code maximum characters 20",
              },
            })}
          />
          {errors.code && (
            <Label basic color="red" pointing>
              {errors.code.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>UOM Description</label>
          <textarea
            name="description"
            placeholder="UOM Description"
            rows={2}
            ref={register({
              maxLength: {
                value: 50,
                message: "Description maximum characters 50",
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

export default observer(EditUnitOfMeasure);
