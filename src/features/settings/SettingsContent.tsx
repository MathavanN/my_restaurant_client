import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Tab } from 'semantic-ui-react';
import PaymentType from './paymentType/PaymentType';
import StockItem from './stockItem/StockItem';
import StockType from './stockType/StockType';
import Supplier from './supplier/Supplier';
import UnitOfMeasure from './unitOfMeasure/UnitOfMeasure';

const panes = [
  { menuItem: 'Unit Of Measure', render: () => <UnitOfMeasure /> },
  { menuItem: 'Stock Type', render: () => <StockType /> },
  { menuItem: 'Stock Item', render: () => <StockItem /> },
  { menuItem: 'Payment Type', render: () => <PaymentType /> },
  { menuItem: 'Supplier', render: () => <Supplier /> },
];
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setActiveTab: (activeIndex: any) => void;
}
const SettingsContent: FC<IProps> = ({ setActiveTab }) => (
  <>
    <Tab
      menu={{ fluid: true, vertical: true, tabular: true }}
      menuPosition="left"
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      renderActiveOnly={true}
      panes={panes}
    />
  </>
);

export default observer(SettingsContent);
