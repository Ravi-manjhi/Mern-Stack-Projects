import { Routes, Route } from "react-router-dom";
import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import Home from "./components/Home/Home";
import NavBar from "./components/navbar/NavBar";
import Auth from "./components/Auth/Auth";
import "./app.css";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
