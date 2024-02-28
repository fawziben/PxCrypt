import React from 'react'
import MainPageTabs from '../Components/MainPageTabs'
import LocalFilesTable from '../Components/LocalFilesTable'
import SignUpForm from '../Components/SignupForm'
import { Fab } from '@mui/material'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';


export default function MainPage() {
  return (
      <div style={{ marginTop: '100px', padding: 0, width: '100%', } } className = 'overflow-y-hidden'>
  <MainPageTabs title1='Files' title2='Folders'>
    <LocalFilesTable />
    <SignUpForm/>
  </MainPageTabs>
  <Fab sx={{
    position: 'fixed',
    bottom: '16px', // Ajustez la position verticale en fonction de vos besoins
    right: '16px', // Ajustez la position horizontale en fonction de vos besoins
  }} color='primary' aria-label="add">
      <KeyOutlinedIcon/>
  </Fab>
    </div>
  )
}
