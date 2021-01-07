import React, { useContext, Fragment } from "react";
import { Button, Segment, Container, Header, Image } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Home = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment textAlign="center" vertical>
      <Container text style={{ marginTop: "2em" }}>
        <Image src="/assets/WebSiteLogo.png" size="large" centered />
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header as="h2" content={`Welcome back ${user.fullName}`} />
            <Button as={Link} to="/dashboard" size="huge">
              Go to Dashboard!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" content="Welcome to Golden Dining" />
            <Button
              onClick={() => openModal(<LoginForm />)}
              size="huge"
              primary
            >
              Login
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default observer(Home);
