import React from 'react'
import MainPageTabs from '../Components/MainPageTabs'
import SharedFilesTable from '../Components/SharedFilesTable'
import SignUpForm from '../Components/SignupForm'
import ReceivedFilesTable from '../Components/ReceivedFilesTable'


export default function SharedFiles() {
  return (
    <div style={{ marginTop: '100px', padding: 0, width: '100%', } } className = 'overflow-y-hidden'>
        <MainPageTabs title1='Sent' title2='Received'>
            <SharedFilesTable />
            <ReceivedFilesTable/>
        </MainPageTabs>
    </div>
  )
}
