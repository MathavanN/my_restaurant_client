import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='search' />
      Oops - we've looked everywhere but couldn't find this.
    </Header>
    <Segment.Inline>
      <Button as={Link} to='/dashboard' primary>
        Return to Dashboard page
      </Button>
    </Segment.Inline>
  </Segment>
);

export default NotFound;
