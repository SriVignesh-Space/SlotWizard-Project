import React from 'react'
import Navbar from '../Components/Navbar'

const MainPage = () => {
  return (
    <div className='dark:bg-dark h-screen'>
      <Navbar login={true} profile={true}/>
    </div>
  )
}

export default MainPage