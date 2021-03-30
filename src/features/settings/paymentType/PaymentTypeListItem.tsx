import { FC } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { IPaymentTypeSerial } from '../../../app/models/paymentType/paymentType';
import DeletePaymentType from './DeletePaymentType';
import EditPaymentType from './EditPaymentType';

interface IProps {
  hasModifyAccess: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (content: any) => void;
  paymentTypes: IPaymentTypeSerial[];
}
const PaymentTypeListItem: FC<IProps> = ({
  hasModifyAccess,
  paymentTypes,
  openModal,
}) => (
  <>
    <Table.Body>
      {paymentTypes.map((paymentType) => (
        <Table.Row key={paymentType.id}>
          <Table.Cell>{paymentType.serial}</Table.Cell>
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
  </>
);

export default PaymentTypeListItem;
