import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../Components/Login';

const LoginPage = () => {
  return (
    <div className='h-screen border dark:bg-dark'>
      <Navbar login={true} />
      <Login />
    </div>
  );
}

export default LoginPage