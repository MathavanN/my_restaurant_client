// icons
import HomeIcon from '@material-ui/icons/Home';
import PrivateIcon from '@material-ui/icons/LockOutlined';
import PublicIcon from '@material-ui/icons/LockOpenOutlined';

// interface
import MenuItemDetails from '../model/MenuItemDetails.model';

import { PAGE_COUNTER, PAGE_HOME, PAGE_TODO } from '../utils/constants';
import Home from '../features/home/Home';
import Counter from '../features/counter/Counter';
import Todo from '../features/todo/Todo';

export const menuItems: Array<MenuItemDetails> = [
  {
    routeKey: 'router-home',
    title: PAGE_HOME.title,
    tooltip: PAGE_HOME.tooltip,
    path: PAGE_HOME.path,
    enabled: true,
    component: Home,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    routeKey: 'router-counter',
    title: PAGE_COUNTER.title,
    tooltip: PAGE_COUNTER.tooltip,
    path: PAGE_COUNTER.path,
    enabled: true,
    component: Counter,
    icon: PublicIcon,
    appendDivider: true,
  },
  {
    routeKey: 'router-todo',
    title: PAGE_TODO.title,
    tooltip: PAGE_TODO.tooltip,
    path: PAGE_TODO.path,
    enabled: true,
    component: Todo,
    icon: PrivateIcon,
    appendDivider: true,
  },
];