import "./App.css";
import { useWhoAmIQuery } from "./generated/graphql";
import { NavBar } from "./ui/nav/NavBar";
import { useEffect } from "react";
import { FullPageSpinner } from "./ui/spinner/FullPageSpinner";

function App() {
  const { data, loading, error } = useWhoAmIQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <div className="App">
      <NavBar />
      {data?.whoAmI.id}
    </div>
  );
}

export default App;
