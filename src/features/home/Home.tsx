/* eslint-disable react/button-has-type */
import { useHistory } from 'react-router-dom';
import { PAGE_COUNTER, PAGE_TODO } from '../../config/constants';

const Home = () => {
  const history = useHistory();
  return (
    <div>
      This is home
      <br />
      <button onClick={() => history.push(PAGE_COUNTER.path)}>
        Go to Counter
      </button>
      <br />
      <button onClick={() => history.push(PAGE_TODO.path)}>Go to Todo</button>
    </div>
  );
};

export default Home;
