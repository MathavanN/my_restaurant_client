import React, { FC, Fragment, useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import {
  combineValidators,
  composeValidators,
  hasLengthLessThan,
  isNumeric,
  isRequired,
} from "revalidate";
import SelectInput from "../../app/common/form/SelectInput";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import {
  PurchaseOrderFormValues,
  CreatePurchaseOrder,
} from "../../app/models/purchaseOrder";

const validate = combineValidators({
  description: hasLengthLessThan(500)({
    message: "Description maximum characters 500",
  }),
  supplierId: isRequired("Supplier"),
  discount: composeValidators(
    isNumeric({ message: "Discount must be a positive number" })
  )(),
});

interface IProps {
  formData: PurchaseOrderFormValues;
  header: string;
  handleCancel: () => void;
}

const AddPurchaseOrder: FC<IProps> = ({ formData, header, handleCancel }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    createPurchaseOrder,
    updatePurchaseOrder,
  } = rootStore.purchaseOrderStore;
  const { loadSupplierOptions } = rootStore.settingsStore;
  const { closeModal } = rootStore.modalStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...formData } = values;
    const order = new CreatePurchaseOrder(formData);

    if (order.id === 0) createPurchaseOrder(order);
    else updatePurchaseOrder(order).finally(() => closeModal());
  };

  return (
    <Fragment>
      <FinalForm
        validate={validate}
        initialValues={formData!}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine, dirtySinceLastSubmit }) => (
          <Form onSubmit={handleSubmit} error>
            <Header as="h2" color="teal" textAlign="center">
              <Header.Subheader>{header}</Header.Subheader>
            </Header>
            <Field
              name="supplierId"
              label="Supplier"
              options={loadSupplierOptions}
              placeholder="Select Supplier"
              value={formData.supplierName}
              component={SelectInput as any}
            />

            <Field
              name="discount"
              label="Discount (%)"
              component={TextInput as any}
              placeholder="Discount"
              value={formData.discount}
            />
            <Field
              rows={4}
              name="description"
              label="Order Description"
              placeholder="Description"
              value={formData.description}
              component={TextAreaInput as any}
            />
            <Button
              loading={submitting}
              positive
              content="Submit"
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            />
            <Button content="Cancel" onClick={() => handleCancel()} />
          </Form>
        )}
      />
    </Fragment>
  );
};

export default AddPurchaseOrder;
