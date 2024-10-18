import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/NavBar";
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <div style={{ marginTop: "5em" }}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
