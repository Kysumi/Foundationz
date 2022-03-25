import { Counter } from "./features/counter/Counter";
import "./App.css";
import { useWhoAmIQuery } from "./generated/graphql";

function App() {
  const { data, loading } = useWhoAmIQuery();

  return (
    <div className="App">
      <Counter />
      {data?.whoAmI?.id}
    </div>
  );
}

export default App;
