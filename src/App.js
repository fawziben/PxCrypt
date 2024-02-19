import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import LoginTabs from './Components/CustomTabs'
import SignUpForm from './Components/SignupForm'
import Layout from './Pages/Layout'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#27535E'
    }
  },
  Tab: {
    fontFamily: 'Poppins',
    fontWeightRegular: 400,
  }
})

export default function App() {
  return (
    
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/add" element={<Layout/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}
