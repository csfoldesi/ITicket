import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/NavBar";
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container style={{ marginTop: "5em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
