import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

const ErrorEl = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/");
  },[])

  return (
    <div className='dark:text-white h-screen'>No Page Found</div>
  )
}

export default ErrorEl