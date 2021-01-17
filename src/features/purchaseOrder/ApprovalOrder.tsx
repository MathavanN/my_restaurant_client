import React, { Fragment, useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import {
  combineValidators,
  composeValidators,
  hasLengthLessThan,
  isRequired,
} from "revalidate";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { FC } from "react";
import { ApprovalPurchaseOrder } from "../../app/models/purchaseOrder";
import { RootStoreContext } from "../../app/stores/rootStore";
import history from "../../history";

const validate = combineValidators({
  approvalReason: composeValidators(
    isRequired("Reason"),
    hasLengthLessThan(500)({ message: "Reason maximum characters 500" })
  )(),
});

interface IProps {
  header: string;
  orderId: number;
  status: string;
}

export const ApprovalOrder: FC<IProps> = ({ header, orderId, status }) => {
  const rootStore = useContext(RootStoreContext);
  const { approvalPurchaseOrder } = rootStore.purchaseOrderStore;
  const { closeModal } = rootStore.modalStore;
  return (
    <Fragment>
      <FinalForm
        validate={validate}
        onSubmit={(values: ApprovalPurchaseOrder) => {
          const approval = new ApprovalPurchaseOrder(
            orderId,
            status,
            values.approvalReason
          );
          approvalPurchaseOrder(approval).finally(() => {
            closeModal();
            history.push("/purchase");
          });
        }}
        render={({
          handleSubmit,
          submitting,
          invalid,
          pristine,
          dirtySinceLastSubmit,
        }) => (
          <Form onSubmit={handleSubmit} error>
            <Header as="h2" color="teal" textAlign="center">
              <Header.Subheader>{header}</Header.Subheader>
            </Header>

            <Field
              rows={4}
              name="approvalReason"
              label="Reason"
              placeholder="Reason"
              component={TextAreaInput as any}
            />
            <Button
              loading={submitting}
              positive
              content="Submit"
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            />
          </Form>
        )}
      />
    </Fragment>
  );
};
