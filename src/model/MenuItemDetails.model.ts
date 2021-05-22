import { ComponentType, FC } from 'react';

interface MenuItemDetails {
  routeKey: String;
  title: String;
  tooltip?: String;
  path?: String;
  component?: FC<{}>;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: Array<MenuItemDetails>;
  appendDivider?: boolean;
}

export default MenuItemDetails;
