
// icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/BarChartOutlined';
import CodeIcon from '@material-ui/icons/CodeOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import PrivateIcon from '@material-ui/icons/LockOutlined';
import PublicIcon from '@material-ui/icons/LockOpenOutlined';

// components
import Home from '../features/home/Home';
import Settings from '../features/settings/Settings';
import Counter from '../features/counter/Counter';

// interface
import MenuItemDetails from '../model/MenuItemDetails.model';
import ToDoList from 'features/todo/ToDoList';
import { PAGE_COUNTER, PAGE_HOME, PAGE_SETTINGS, PAGE_TODO } from 'utils/constants';

export const menuItems: Array<MenuItemDetails> = [
    {
        routeKey: "router-home",
        title: PAGE_HOME.title,
        tooltip: PAGE_HOME.tooltip,
        path: PAGE_HOME.path,
        enabled: true,
        component: Home,
        icon: HomeIcon,
        appendDivider: true
    },
    {
        routeKey: "router-counter",
        title: PAGE_COUNTER.title,
        tooltip: PAGE_COUNTER.tooltip,
        path: PAGE_COUNTER.path,
        enabled: true,
        component: Counter,
        icon: PublicIcon,
        appendDivider: true
    },
    {
        routeKey: "router-todo",
        title: PAGE_TODO.title,
        tooltip: PAGE_TODO.tooltip,
        path: PAGE_TODO.path,
        enabled: true,
        component: ToDoList,
        icon: PrivateIcon,
        appendDivider: true
    },
    {
        routeKey: "router-settings",
        title: PAGE_SETTINGS.title,
        tooltip: PAGE_SETTINGS.tooltip,
        path: PAGE_SETTINGS.path,
        enabled: true,
        component: Settings,
        icon: SettingsIcon
    }
]