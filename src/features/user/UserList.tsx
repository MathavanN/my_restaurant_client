import { observer } from 'mobx-react-lite';
import { Header } from 'semantic-ui-react';
import { useContext, useEffect } from 'react';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../app/stores/rootStore';
import UserListItem from './UserListItem';

const UserList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadAppUsers, getAppUsers, loadingInitial } = rootStore.userStore;

  useEffect(() => {
    loadAppUsers();
  }, [loadAppUsers]);

  if (loadingInitial)
    return <LoadingComponent content='Loading user details...' />;

  return (
    <>
      <Header as='h3' dividing textAlign='center'>
        User Details
      </Header>
      <UserListItem users={getAppUsers} />
    </>
  );
};

export default observer(UserList);
