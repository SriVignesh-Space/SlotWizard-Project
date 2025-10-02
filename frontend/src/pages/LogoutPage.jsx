import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import api from '../Lib/axios';
import toast from 'react-hot-toast';

const LogoutPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    async function Logout(){
      try {
        const res = await api.get('logout');

        if(res.data.success){
          toast.success("Logged out Successfully");
          navigate('/');
        }
        else{
          toast.error("Something went Wrong");
          navigate('/');
        }
      } catch (error) {
        console.log(error)
        toast.error("Authentication error");
        navigate('/login')
      }
    }

    Logout();
  })

  return (
    <></>
  )
}

export default LogoutPage