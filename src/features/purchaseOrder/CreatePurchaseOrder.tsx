import { observer } from "mobx-react-lite";
import React, { FC, Fragment, useContext, useEffect, useState } from "react";
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
import { RouteComponentProps } from "react-router-dom";
import { PurchaseOrderFormValues } from "../../app/models/purchaseOrder";

const validate = combineValidators({
  description: hasLengthLessThan(500)({
    message: "Description maximum characters 500",
  }),
  supplierId: isRequired("Supplier"),
  discount: composeValidators(
    isNumeric({ message: "Discount must be a positive number" })
  )(),
});

interface IDetailsParams {
  id: string;
}

const CreatePurchaseOrder: FC<RouteComponentProps<IDetailsParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    createPurchaseOrder,
    loadPurchaseOrder,
    purchaseOrder,
  } = rootStore.purchaseOrderStore;
  const { loadSuppliers, loadSupplierOptions } = rootStore.settingsStore;
  const [formData, setFormData] = useState(new PurchaseOrderFormValues());

  useEffect(() => {
    loadSuppliers();
    if (match.params.id) {
      loadPurchaseOrder(parseInt(match.params.id)).finally(() =>
        setFormData(new PurchaseOrderFormValues(purchaseOrder!))
      );
    }
  }, [loadSuppliers, loadPurchaseOrder, match.params.id, purchaseOrder]);

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
    createPurchaseOrder(values);
  };

  const handleCancel = () => {
    history.push("/purchase");
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
              <Header.Subheader>
                {match.params.id
                  ? "Modify purchase order"
                  : "Create new purchase order"}
              </Header.Subheader>
            </Header>
            <Field
              name="supplierId"
              label="Supplier"
              options={loadSupplierOptions}
              placeholder="Supplier"
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

export default observer(CreatePurchaseOrder);
