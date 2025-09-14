import React from 'react';
import Navbar from "../components/Navbar"; 
import Sidebar from '../Components/Sidebar';

const MainPage = () => {
  return (
    <div className='dark:bg-dark h-screen'>
      <Navbar login={true} profile={true}/>
      <Sidebar />
    </div>
  )
}

export default MainPage