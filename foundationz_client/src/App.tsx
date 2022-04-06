import "./App.css";
import { useEffect } from "react";
import { FullPageSpinner } from "./ui/components/spinner/FullPageSpinner";
import { Route, Routes, useNavigate } from "react-router";
import { Bookings } from "./ui/pages/Bookings";
import { Contacts } from "./ui/pages/Contacts";
import { NavBar } from "./ui/components/nav/NavBar";
import { useCheckCurrentUser } from "./gql/cache";

const App = () => {
  const nav = useNavigate();
  const { data, loading, error } = useCheckCurrentUser();

  useEffect(() => {
    if (error) {
      nav("/login");
    }
  }, [error, nav]);

  if (loading || error) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Contacts />} />
        <Route path={"*"} element={<Bookings />} />
        {data?.whoAmI.id}
      </Routes>
    </>
  );
};

export default App;
