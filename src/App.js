import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import Login from "./Pages/Login";
import Layout from "./Pages/Layout";
import MainPage from "./Pages/MainPage";
import SharedFiles from "./Pages/SharedFiles";
import FileStats from "./Components/FileStats/FileStats";
import { Groups } from "@mui/icons-material";
import UserGroups from "./Pages/UserGroups";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#27535E",
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
  },
});

// Pour pouvoir filtre avec la barre de recherche

function App() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="dashboard"
            element={<Layout setSearchVal={setSearchVal} />}
          >
            <Route index element={<MainPage searchVal={searchVal} />} />
            <Route path="sharedfiles" element={<SharedFiles />} />
            <Route path="analytics" element={<FileStats />} />
            <Route path="groups" element={<UserGroups />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
