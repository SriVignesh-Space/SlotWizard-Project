import React from 'react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const SignUpPage = () => {

  const navigate = useNavigate()

  function handleClick()
  {
    toast.success("Welcome to Slot-Wizard")
    navigate("/main")
  }

  return (
    <div className='h-screen dark:bg-dark'>
        <Navbar />
        <div className='m-20 flex justify-center dark:text-white items-center'>
            <div className='w-2xl bg-dark/5 dark:bg-white/5 backdrop-blur-sm border border-dark/20 dark:border-white/20 rounded-4xl'>
                <h1 className='text-4xl font-bold text-center p-5'>Sign-Up</h1>
                <div className='flex flex-col gap-5 m-1 p-4 justify-center items-center'>
                  <input type="text" name='name' className='in' placeholder='Username'/>
                  <input type="email" name='email' className='in'placeholder='Email'/>
                  <input type="text" name='reg-num' className='in'placeholder='Register Number'/>
                  <div className='flex gap-3 justify-center items-center'>
                    <select name="dept" className='bg-dark/20 dark:bg-white/40 border border-white/10 rounded-xl px-6 p-3 text-dark/60 dark:text-white/60' id="dept">
                        <option value="Department" hidden>Select a Department</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="AIDS">AI-DS</option>
                        <option value="AIML">AI-ML</option>
                        <option value="CSE(CS)">CSE(CS)</option>
                        <option value="CSE(IOT)">CSE(IOT)</option>
                    </select>
                  </div>
                  <div className='w-4/5 flex gap-4'>
                      <input type="password" name="password" className='in w-full' placeholder='Create Password' />
                      <input type="password" name="password" className='in w-full' placeholder='Confirm Password' />
                  </div>
                  <button className='btn m-2 text-xl rounded-2xl dark:bg-white dark:text-dark px-4 font-bold' onClick={handleClick}>
                    Create Account
                  </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage