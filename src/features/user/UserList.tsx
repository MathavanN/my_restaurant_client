import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import UserListItem from "./UserListItem";

const UserList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadAppUsers, getAppUsers, loadingInitial } = rootStore.userStore;

  useEffect(() => {
    loadAppUsers();
  }, [loadAppUsers]);

  if (loadingInitial)
    return <LoadingComponent content="Loading user details..." />;

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
