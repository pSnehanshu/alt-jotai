import { atom, useAtom } from "./alt-jotai";
import "./styles.css";

const countState = atom(0);

function Counter() {
  const [count] = useAtom(countState);
  return <span>Count: {count}</span>;
}

function Increment() {
  const [count, setCount] = useAtom(countState);
  return (
    <button onClick={() => setCount(count + 1)}>
      Increment to {count + 1}
    </button>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Alt Jotai</h1>
      <Counter />
      <hr />
      <Increment />
    </div>
  );
}
