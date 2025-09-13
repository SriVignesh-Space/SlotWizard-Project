import React from 'react'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const Login = () => {

    const navigate = useNavigate()

    function handleClick(){
        toast.success("Loggin")
        navigate('/main')
    }

  return (
    <div className='h-5/6 dark:text-white flex justify-center items-center'>
        <div className='w-md  bg-dark/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border dark:border-white/20 border-dark/20'>
            <h1 className='text-4xl font-bold text-center p-6 '>Login</h1>
            <div className='flex flex-col gap-5 m-1 justify-center items-center'>
                <input type="text" className='in' placeholder='Username'/>
                <input type="password" className='in' placeholder='Password'/>
                <button onClick={handleClick} className='btn m-2 text-xl rounded-2xl dark:bg-white dark:text-dark px-4 font-bold'>
                Login
                </button>
            </div>
            <div className='text-md text-dark-secondary/70 dark:text-secondary/40 text-center py-5'>
                <h3>Don't have an Account? <span className='text-dark dark:text-primary'><Link to={"/signup"}>Sign-Up</Link></span></h3>
            </div>
        </div>
    </div>
  )
}

export default Login