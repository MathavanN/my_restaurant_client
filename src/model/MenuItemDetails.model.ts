import { ComponentType, FC } from 'react';

interface MenuItemDetails {
  routeKey: string;
  title: string;
  tooltip?: string;
  path?: string;
  component?: FC<{}>;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: Array<MenuItemDetails>;
  appendDivider?: boolean;
}

export default MenuItemDetails;
