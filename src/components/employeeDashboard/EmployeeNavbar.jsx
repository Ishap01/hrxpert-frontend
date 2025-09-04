import React from 'react'
import { useNavigate } from 'react-router-dom'

import EmployeeNotifications from './EmployeeNotificationPanel';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const navigate = useNavigate();
   const { logout } = useAuth();

    const handleLogout = () => {
    logout();              
    navigate('/');         
  };
  
  
   const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name || 'user';
  return (
    <div className=' mt-0 flex items-center text-white h-14 bg-teal-300 px-5 shadow-md mb-0 sticky top-0'>
     
      <p className='text-lg font-semibold'>Welcome {username}</p>
      <div className='ml-auto flex items-center gap-4'>
      <EmployeeNotifications/>
      <button className='px-4 py-1 bg-teal-500 hover:bg-teal-700' onClick={handleLogout}>Logout</button>
    </div>
    </div>
  )
}

export default Navbar;
