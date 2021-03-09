import { FC, Fragment } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { IPaymentType } from "../../../app/models/paymentType";
import DeletePaymentType from "./DeletePaymentType";
import EditPaymentType from "./EditPaymentType";

interface IProps {
  hasModifyAccess: boolean;
  openModal: (content: any) => void;
  paymentTypes: [string, IPaymentType][];
}
const PaymentTypeListItem: FC<IProps> = ({
  hasModifyAccess,
  paymentTypes,
  openModal,
}) => {
  return (
    <Fragment>
      <Table.Body>
        {paymentTypes.map(([group, paymentType]) => (
          <Table.Row key={paymentType.id}>
            <Table.Cell>{group}</Table.Cell>
            <Table.Cell>{paymentType.name}</Table.Cell>
            <Table.Cell>{paymentType.creditPeriod}</Table.Cell>
            {hasModifyAccess && (
              <Table.Cell collapsing textAlign="right">
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() =>
                    openModal(<EditPaymentType paymentType={paymentType} />)
                  }
                >
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name="edit" />
                  </Button.Content>
                </Button>
                <Button
                  animated="vertical"
                  color="red"
                  onClick={() =>
                    openModal(<DeletePaymentType paymentType={paymentType} />)
                  }
                >
                  <Button.Content hidden>Delete</Button.Content>
                  <Button.Content visible>
                    <Icon name="delete" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Fragment>
  );
};

export default PaymentTypeListItem;
