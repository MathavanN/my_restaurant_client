import { FC } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { PaymentTypeFormValues } from '../../../app/models/paymentType/paymentTypeFormValues';
import EditPaymentType from './EditPaymentType';

interface IProps {
  hasModifyAccess: boolean;
  paymentType: PaymentTypeFormValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (content: any) => void;
}
const PaymentTypeListHeader: FC<IProps> = ({
  hasModifyAccess,
  paymentType,
  openModal,
}) => (
  <>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>No</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Credit Period</Table.HeaderCell>
        {hasModifyAccess && (
          <Table.HeaderCell>
            <Button
              animated="vertical"
              color="green"
              onClick={() =>
                openModal(<EditPaymentType paymentType={paymentType} />)
              }
            >
              <Button.Content hidden>Add</Button.Content>
              <Button.Content visible>
                <Icon name="add circle" />
              </Button.Content>
            </Button>
          </Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
  </>
);

export default PaymentTypeListHeader;
