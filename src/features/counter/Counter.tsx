/* eslint-disable react/button-has-type */
import { useHistory } from 'react-router-dom';
import { PAGE_HOME, PAGE_TODO } from '../../utils/constants';

const Counter = () => {
  const history = useHistory();
  return (
    <div>
      This is Counter
      <button onClick={() => history.push(PAGE_HOME.path)}>Go to home</button>
      <br />
      <button onClick={() => history.push(PAGE_TODO.path)}>Go to todo</button>
    </div>
  );
};

export default Counter;
