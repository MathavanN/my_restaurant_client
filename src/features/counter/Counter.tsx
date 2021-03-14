import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCount } from "./counterSlice";

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
        <span>{count}</span>
        <Button
          variant="contained"
          color="primary"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
      </div>
    </div>
  );
};

export default Counter;
