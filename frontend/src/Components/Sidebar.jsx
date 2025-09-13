import React from 'react'

const Sidebar = () => {
  return (
    <div className='border w-md m-5 h-5/6 bg-dark/5 border-dark/20 dark:bg-white/5 backdrop-blur-sm dark:border-white/20 rounded-3xl flex flex-col items-center'>
        <input type="text" className='in m-5 border-dark border-2' placeholder='Search'/>
        <div className='bg-dark/30 dark:bg-white/50 w-sm rounded-2xl p-3'>
            <p>19MA222 - Logic and Combinatorics</p>

        </div>
    </div>
  )
}

export default Sidebar