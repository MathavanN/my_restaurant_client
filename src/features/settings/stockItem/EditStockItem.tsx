import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import {
  combineValidators,
  composeValidators,
  hasLengthLessThan,
  isNumeric,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import {
  CreateStockItem,
  StockItemFormValues,
} from "../../../app/models/stockItem";
import { isGreaterThan } from "../../../app/common/validators/customValidators";

interface IProps {
  setEditForm: (value: boolean) => void;
  setCreate: (value: boolean) => void;
  setEdit: (value: boolean) => void;
  edit: boolean;
  create: boolean;
}

const validate = combineValidators({
  name: composeValidators(
    isRequired("Name"),
    hasLengthLessThan(250)({ message: "Name maximum characters 250" })
  )(),
  description: hasLengthLessThan(500)({
    message: "Description maximum characters 500",
  }),
  typeId: isRequired("Stock Type"),
  unitOfMeasureId: isRequired("Unit Of Measure"),
  itemUnit: composeValidators(
    isRequired("Item Unit"),
    isNumeric({ message: "Item Unit must be a positive number" }),
    isGreaterThan(0)({ message: "Item unit must be greater than zero" })
  )(),
});

const EditStockItem: FC<IProps> = ({
  setEditForm,
  setCreate,
  setEdit,
  edit,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUnitOfMeasures,
    loadStockTypes,
    createStockItem,
    updateStockItem,
    loadStockTypeOptions,
    loadUnitOfMeasureOptions,
    submitting,
    stockItem,
  } = rootStore.settingsStore;
  const [formData, setFormData] = useState(new StockItemFormValues());
  useEffect(() => {
    loadUnitOfMeasures();
    loadStockTypes();
    if (edit) {
      setFormData(new StockItemFormValues(stockItem!));
    }
  }, [edit, stockItem, loadUnitOfMeasures, loadStockTypes]);

  const handleFinalFormSubmit = (values: any) => {
    validate();
    const { ...formData } = values;
    const stockItem = new CreateStockItem(formData);
    if (stockItem.id === 0) {
      createStockItem(stockItem);
    } else {
      updateStockItem(stockItem);
    }
    handleEditFormMode();
  };

  const handleEditFormMode = () => {
    setFormData(new StockItemFormValues());
    setEditForm(false);
    setCreate(false);
    setEdit(false);
  };

  return (
    <FinalForm
      validate={validate}
      initialValues={formData!}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" color="teal" textAlign="center">
            <Header.Subheader>
              {edit ? "Modify Stock Item" : "Add Stock Item"}
            </Header.Subheader>
          </Header>
          <Field
            name="typeId"
            label="Stock Type"
            options={loadStockTypeOptions}
            placeholder="Stock Type"
            value={formData.stockType}
            component={SelectInput as any}
          />

          <Field
            name="name"
            label="Item Name"
            component={TextInput as any}
            placeholder="Name"
            value={formData.name}
          />
          <Field
            name="unitOfMeasureId"
            label="Unit Of Measure"
            options={loadUnitOfMeasureOptions}
            placeholder="Unit Of Measure"
            value={formData.unitOfMeasureCode}
            component={SelectInput as any}
          />
          <Field
            name="itemUnit"
            label="Item Unit"
            component={TextInput as any}
            placeholder="Item Unit"
            value={formData.itemUnit}
          />
          <Field
            rows={4}
            name="description"
            label="Item Description"
            placeholder="Description"
            value={formData.description}
            component={TextAreaInput as any}
          />
          <Button
            loading={submitting}
            positive
            content="Save"
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
          />
          <Button content="Cancel" onClick={() => handleEditFormMode()} />
        </Form>
      )}
    />
  );
};

export default observer(EditStockItem);
