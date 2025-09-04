import React from 'react'
import { FaUser } from 'react-icons/fa';

const EmployeeSummary = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name || 'user';
  return (
    <div className='p-6 '>
    <div className='rounded flex bg-white'>
      <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
            <FaUser/>
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>Welcome back {username} </p>
      
       
      </div>
    </div>
    </div>
  )
}

export default EmployeeSummary;
