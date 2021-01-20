import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import UserList from "./UserList";
import { Button, Message, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import RegisterAdminUser from "./RegisterAdminUser";
import RegisterNonAdminUser from "./RegisterNonAdminUser";

const UserDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <Fragment>
      <Message info icon>
        <Icon name="shopping cart" />
        <Message.Content>
          <Message.Header>Register new user</Message.Header>
        </Message.Content>
        <Button
          floated="left"
          onClick={() => openModal(<RegisterNonAdminUser />)}
        >
          Normal User
        </Button>
        <Button floated="left" onClick={() => openModal(<RegisterAdminUser />)}>
          Admin User
        </Button>
      </Message>
      <UserList />
    </Fragment>
  );
};
export default observer(UserDashboard);
