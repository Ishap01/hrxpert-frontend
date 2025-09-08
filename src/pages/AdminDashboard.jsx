import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'

const AdminDashboard = () => {
  return (
    
      <div className='px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen'>
        
        <AdminSummary/>
      </div>
   
  )
}

export default AdminDashboard
