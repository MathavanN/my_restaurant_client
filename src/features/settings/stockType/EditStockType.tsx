import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import {
  combineValidators,
  composeValidators,
  hasLengthLessThan,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { StockTypeFormValues } from "../../../app/models/stockType";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

interface IProps {
  setEditForm: (value: boolean) => void;
  setCreate: (value: boolean) => void;
  setEdit: (value: boolean) => void;
  edit: boolean;
  create: boolean;
}

const validate = combineValidators({
  type: composeValidators(
    isRequired("Type"),
    hasLengthLessThan(20)({ message: "Type maximum characters 50" })
  )(),
  description: hasLengthLessThan(100)({
    message: "Description maximum characters 100",
  }),
});

const EditStockType: FC<IProps> = ({
  setEditForm,
  setCreate,
  setEdit,
  edit,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    updateStockType,
    createStockType,
    stockType,
    submitting,
  } = rootStore.settingsStore;

  const [formData, setFormData] = useState(new StockTypeFormValues());
  useEffect(() => {
    if (edit) {
      setFormData(new StockTypeFormValues(stockType!));
    }
  }, [edit, stockType]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...formData } = values;
    if (formData.id === 0) {
      createStockType(formData);
    } else {
      updateStockType(formData);
    }
    handleEditFormMode();
  };

  const handleEditFormMode = () => {
    setFormData(new StockTypeFormValues());
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
              {edit ? "Modify Stock Type" : "Create Stock Type"}
            </Header.Subheader>
          </Header>
          <Field
            name="type"
            label="Stock Type"
            component={TextInput as any}
            placeholder="Type"
            value={formData.type}
          />
          <Field
            rows={2}
            name="description"
            label="Stock Type Description"
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

export default observer(EditStockType);
