import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import logo from '../../assets/NavBarLogo.png';

const NavBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Container style={{ width: '100%' }}>
      <Menu style={{ margin: 0, borderRadius: 0 }} inverted>
        <Menu.Item header as={NavLink} exact to="/">
          <img src={logo} alt="Golden Dining" style={{ paddingRight: '5px' }} />
          Golden Dining
        </Menu.Item>
        <Menu.Item name="Dashboard" as={NavLink} to="/dashboard" />
        <Menu.Item name="Purchase" as={NavLink} to="/purchase" />
        <Menu.Item name="GRN" as={NavLink} to="/grn" />
        <Menu.Item name="Settings" as={NavLink} to="/settings" />
        <Menu.Item name="Users" as={NavLink} to="/users" />
        {user && (
          <Menu.Item position="right">
            <FontAwesomeIcon icon={faUser} size="lg" className="fa-fw" />
            <Dropdown pointing="top right" text={user.firstName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={NavLink}
                  to="/user"
                  text="profile"
                  icon="content"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Menu>
    </Container>
  );
};

export default observer(NavBar);
