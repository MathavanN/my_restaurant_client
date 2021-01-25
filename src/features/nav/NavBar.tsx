import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Dropdown } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu style={{ margin: 0 }}>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          Golden Dining
        </Menu.Item>
        <Menu.Item name="Dashboard" as={NavLink} to="/dashboard" />
        <Menu.Item name="Purchase" as={NavLink} to="/purchase" />
        <Menu.Item name="Settings" as={NavLink} to="/settings" />
        <Menu.Item name="Users" as={NavLink} to="/users" />
        {user && (
          <Menu.Item position="right">
            <FontAwesomeIcon icon={faUser} size="lg" className="fa-fw" />
            <Dropdown pointing="top left" text={user.firstName}>
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
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
