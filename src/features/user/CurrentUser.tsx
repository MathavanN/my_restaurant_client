import { useContext } from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { RootStoreContext } from '../../app/stores/rootStore';

const CurrentUser = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  return (
    <>
      {user && (
        <Grid>
          <Grid.Column width={8}>
            <Card>
              <FontAwesomeIcon icon={faUserTie} size='10x' className='fa-fw' />
              <Card.Content>
                <Card.Content header={user.fullName} />
                <Card.Meta>
                  <span>First Name: {user.firstName}</span>
                </Card.Meta>
                <Card.Meta>
                  <span>Last Name: {user.lastName}</span>
                </Card.Meta>
                <Card.Content extra>
                  <Icon name='mail' />
                  {user.email}
                </Card.Content>
              </Card.Content>
              <Card.Content extra>
                Available Access Roles:
                <ul>
                  {user.roles.map((role: string, i: number) => (
                    <li key={i}>{role}</li>
                  ))}
                </ul>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8}>
            User Modify first name and Last name
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default CurrentUser;
