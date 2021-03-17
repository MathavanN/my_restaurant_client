
// icons
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import PrivateIcon from '@material-ui/icons/LockOutlined';
import PublicIcon from '@material-ui/icons/LockOpenOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import PagesOutlinedIcon from '@material-ui/icons/PagesOutlined';

// components
import Home from '../features/home/Home';
import Settings from '../features/settings/Settings';
import Counter from '../features/counter/Counter';

// interface
import MenuItemDetails from '../model/MenuItemDetails.model';
import ToDoList from 'features/todo/ToDoList';
import { PAGE_COUNTER, PAGE_HOME, PAGE_SETTINGS, PAGE_STOCK_ITEM, PAGE_STOCK_TYPE, PAGE_STORE, PAGE_TODO, PAGE_UOM } from 'utils/constants';
import UnitOfMeasure from 'features/unitOfMeasure/UnitOfMeasure';
import StockType from 'features/stockType/StockType';

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
        routeKey: "router-store",
        title: PAGE_STORE.title,
        tooltip: PAGE_STORE.tooltip,
        enabled: true,
        icon: StoreOutlinedIcon,
        subRoutes: [
            {
                routeKey: "router-store-uom",
                title: PAGE_UOM.title,
                tooltip: PAGE_UOM.tooltip,
                path: PAGE_UOM.path,
                enabled: true,
                component: UnitOfMeasure,
                icon: PagesOutlinedIcon
            },
            {
                routeKey: "router-store-stock-type",
                title: PAGE_STOCK_TYPE.title,
                tooltip: PAGE_STOCK_TYPE.tooltip,
                path: PAGE_STOCK_TYPE.path,
                enabled: true,
                component: StockType,
                icon: PagesOutlinedIcon
            },
            {
                routeKey: "router-store-stock-item",
                title: PAGE_STOCK_ITEM.title,
                tooltip: PAGE_STOCK_ITEM.tooltip,
                path: PAGE_STOCK_ITEM.path,
                enabled: true,
                component: StockType,
                icon: PagesOutlinedIcon
            }
        ]
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