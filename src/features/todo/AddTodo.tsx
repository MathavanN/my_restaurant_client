import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTitle("");

    dispatch(
      addTodo({
        id: Date.now().toString(),
        completed: false,
        title,
      })
    );
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add Todo</button>
      </form>
      <p>
        MANDALAY, Myanmar: Security forces in Myanmar on Saturday (Mar 13) again
        met protests against last month’s military takeover with lethal force,
        killing at least four people by shooting live ammunition at
        demonstrators. Five people were shot dead and several injured when
        police opened fire on a sit-in protest in Mandalay, Myanmar's
        second-biggest city, witnesses told Reuters. Five people were shot dead
        and several injured when police opened fire on a sit-in protest in
        Mandalay, Myanmar's second-biggest city, witnesses told Reuters. Another
        person was killed in the central town of Pyay and two died in police
        firing in the commercial capital Yangon, where three were also killed
        overnight, domestic media reported. "They are acting like they are in a
        war zone, with unarmed people," said Mandalay-based activist Myat Thu.
        He said the dead included a 13-year-old child. Si Thu Tun, another
        protester, said he saw two people shot, including a Buddhist monk. "One
        of them was hit in the pubic bone, another was shot to death terribly,"
        he said.
      </p>
    </Fragment>
  );
};

export default AddTodo;
