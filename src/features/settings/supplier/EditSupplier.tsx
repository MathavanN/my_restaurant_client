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
import TextInput from "../../../app/common/form/TextInput";
import { SupplierFormValues } from "../../../app/models/supplier";

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
    hasLengthLessThan(256)({ message: "Name maximum characters 256" })
  )(),
  address1: composeValidators(
    isRequired("Address 1"),
    hasLengthLessThan(256)({ message: "Address 1 maximum characters 256" })
  )(),
  city: composeValidators(
    isRequired("City"),
    hasLengthLessThan(100)({ message: "City maximum characters 100" })
  )(),
  country: composeValidators(
    isRequired("Country"),
    hasLengthLessThan(100)({ message: "Country maximum characters 100" })
  )(),
  telephone1: hasLengthLessThan(20)({
    message: "Telephone 1 maximum characters 256",
  }),
  telephone2: hasLengthLessThan(20)({
    message: "Telephone 2 maximum characters 256",
  }),
  fax: hasLengthLessThan(20)({
    message: "Fax maximum characters 256",
  }),
  email: hasLengthLessThan(256)({
    message: "Email maximum characters 256",
  }),
  contactPerson: hasLengthLessThan(256)({
    message: "Contact person maximum characters 256",
  }),
});

const EditSupplier: FC<IProps> = ({
  setEditForm,
  setCreate,
  setEdit,
  edit,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    updateSupplier,
    createSupplier,
    supplier,
    submitting,
  } = rootStore.settingsStore;

  const [formData, setFormData] = useState(new SupplierFormValues());
  useEffect(() => {
    if (edit) {
      setFormData(new SupplierFormValues(supplier!));
    }
  }, [edit, supplier]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...formData } = values;
    if (formData.id === 0) {
      createSupplier(formData);
    } else {
      updateSupplier(formData);
    }
    handleEditFormMode();
  };

  const handleEditFormMode = () => {
    setFormData(new SupplierFormValues());
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
              {edit ? "Modify Supplier Details" : "Add New Supplier"}
            </Header.Subheader>
          </Header>
          <Field
            name="name"
            label="Supplier Name"
            component={TextInput as any}
            placeholder="Name"
            value={formData.name}
          />
          <Field
            name="address1"
            label="Supplier Address 1"
            component={TextInput as any}
            placeholder="Address"
            value={formData.address1}
          />
          <Field
            name="address2"
            label="Supplier Address 2"
            component={TextInput as any}
            placeholder="Address"
            value={formData.address2}
          />
          <Field
            name="city"
            label="City"
            component={TextInput as any}
            placeholder="City"
            value={formData.city}
          />
          <Field
            name="country"
            label="Country"
            component={TextInput as any}
            placeholder="Country"
            value={formData.country}
          />
          <Field
            name="telephone1"
            label="Telephone 1"
            component={TextInput as any}
            placeholder="Phone Number"
            value={formData.telephone1}
          />
          <Field
            name="telephone2"
            label="Telephone 1"
            component={TextInput as any}
            placeholder="Phone Number"
            value={formData.telephone2}
          />
          <Field
            name="fax"
            label="Fax"
            component={TextInput as any}
            placeholder="Fax"
            value={formData.fax}
          />
          <Field
            name="email"
            label="Email"
            component={TextInput as any}
            placeholder="Email"
            value={formData.email}
          />
          <Field
            name="contactPerson"
            label="Contact Person"
            component={TextInput as any}
            placeholder="Contact Person"
            value={formData.contactPerson}
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

export default observer(EditSupplier);
