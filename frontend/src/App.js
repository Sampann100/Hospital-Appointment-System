import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar.jsx";
import { useEffect } from "react";

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
