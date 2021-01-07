import { observer } from "mobx-react-lite";
import React, { FC, Fragment } from "react";
import { Tab } from "semantic-ui-react";
import StockItem from "./stockItem/StockItem";
import StockType from "./stockType/StockType";
import UnitOfMeasure from "./unitOfMeasure/UnitOfMeasure";

const panes = [
  { menuItem: "Unit Of Measure", render: () => <UnitOfMeasure /> },
  { menuItem: "Stock Type", render: () => <StockType /> },
  { menuItem: "Stock Item", render: () => <StockItem /> },
];
interface IProps {
  setActiveTab: (activeIndex: any) => void;
}
const SettingsContent: FC<IProps> = ({ setActiveTab }) => {
  return (
    <Fragment>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        menuPosition="left"
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        panes={panes}
      />
    </Fragment>
  );
};

export default observer(SettingsContent);
