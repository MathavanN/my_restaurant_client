import { useContext } from 'react';
import { Button, Segment, Container, Header, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import homeImage from '../../assets/WebSiteLog-min.png';

const Home = () => {
  const token = window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment textAlign='center' vertical>
      <Container text style={{ marginTop: '2em' }}>
        <Image src={homeImage} size='large' centered />
        {isLoggedIn && user && token ? (
          <>
            <Header as='h2' content={`Welcome back ${user.fullName}`} />
            <Button as={Link} to='/dashboard' size='huge'>
              Go to Dashboard!
            </Button>
          </>
        ) : (
          <>
            <Header as='h2' content='Welcome to Golden Dining' />
            <Button
              onClick={() => openModal(<LoginForm />)}
              size='huge'
              primary
            >
              Login
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(Home);
