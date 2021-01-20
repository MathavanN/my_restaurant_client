import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import UserListItem from "./UserListItem";

const UserList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadAppUsers, getAppUsers } = rootStore.userStore;

  useEffect(() => {
    loadAppUsers();
  }, [loadAppUsers]);
  return (
    <Fragment>
      <Header as="h3" dividing textAlign="center">
        User Details
      </Header>
      <UserListItem users={getAppUsers} />
    </Fragment>
  );
};

export default observer(UserList);
