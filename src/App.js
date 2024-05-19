import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Layout from "./Pages/Layout";
import MainPage from "./Pages/MainPage";
import SharedFiles from "./Pages/SharedFiles";
import FileStats from "./Components/FileStats/FileStats";
import GroupsList from "./Pages/GroupsList";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#27535E",
    },
  },
  Tab: {
    fontFamily: "Poppins",
    fontWeightRegular: 400,
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="sharedfiles" element={<SharedFiles />} />
            <Route path="analytics" element={<FileStats />} />
            <Route path="groups" element={<GroupsList />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
