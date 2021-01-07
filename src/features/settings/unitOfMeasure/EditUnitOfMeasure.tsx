import React, { FC, useContext, useEffect, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  composeValidators,
  hasLengthLessThan,
  isRequired,
} from "revalidate";
import { Form, Button, Header } from "semantic-ui-react";
import { UnitOfMeasureFormValues } from "../../../app/models/unitOfMeasure";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";

const validate = combineValidators({
  code: composeValidators(
    isRequired("Code"),
    hasLengthLessThan(20)({ message: "Code maximum characters 20" })
  )(),
  description: hasLengthLessThan(50)({
    message: "Description maximum characters 50",
  }),
});

interface IProps {
  setEditForm: (value: boolean) => void;
  setCreate: (value: boolean) => void;
  setEdit: (value: boolean) => void;
  edit: boolean;
  create: boolean;
}

const EditUnitOfMeasure: FC<IProps> = ({
  setEditForm,
  setCreate,
  setEdit,
  edit,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    updateUnitOfMeasure,
    createUnitOfMeasure,
    unitOfMeasure,
    submitting,
  } = rootStore.settingsStore;

  const [formData, setFormData] = useState(new UnitOfMeasureFormValues());
  useEffect(() => {
    if (edit) {
      setFormData(new UnitOfMeasureFormValues(unitOfMeasure!));
    }
  }, [edit, unitOfMeasure]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...formData } = values;
    if (formData.id === 0) {
      createUnitOfMeasure(formData);
    } else {
      updateUnitOfMeasure(formData);
    }
    handleEditFormMode();
  };

  const handleEditFormMode = () => {
    setFormData(new UnitOfMeasureFormValues());
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
              {edit ? "Modify Unit Of Measure" : "Create Unit Of Measure"}
            </Header.Subheader>
          </Header>
          <Field
            name="code"
            component={TextInput as any}
            placeholder="Code"
            value={formData.code}
          />
          <Field
            rows={2}
            name="description"
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

export default observer(EditUnitOfMeasure);
