import React from 'react'

const subjects = ({subject,code,credits}) => {
  return (
    <div className='flex place-content-between hover:opacity-50 duration-0 bg-dark/30 dark:bg-white/50 w-sm rounded-2xl p-3'>
            <p>{code} - {subject}</p>
            <p>({credits})</p>
        </div>
  )
}

export default subjects