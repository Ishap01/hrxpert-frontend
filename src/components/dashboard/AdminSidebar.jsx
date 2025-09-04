import React from 'react'
import { Link ,NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt,FaClipboardList, FaCogs,FaFilePdf, FaMoneyBillWave, FaTachometerAlt, FaUser} from "react-icons/fa"
const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-400 h-12 flex items-center justify-center'>
        <h3 className='text-2xl font-pecific text-center'>HRXpert</h3>
      </div>
      
    <div >
        <NavLink to="/admin-dashboard" className={({ isActive }) =>`${isActive ? "bg-teal-300" : ""} text-white no-underline flex items-center space-x-4 py-2.5 px-4 rounded`}>
         <FaTachometerAlt />
        <span>Dashboard</span>
       </NavLink>
        <NavLink to="/admin-dashboard/employees" className={({ isActive }) =>`${isActive ? "bg-teal-300" : ""} text-white no-underline flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaUser /> 
          <span>Employee</span>
        </NavLink>
         <NavLink to="/admin-dashboard/department" className={({ isActive }) =>`${isActive ? "bg-teal-300" : ""} text-white no-underline  flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaBuilding/> 
          <span>Departments</span>
        </NavLink>
         <NavLink to="/admin-dashboard/leaves" className={({ isActive }) =>`${isActive ? "bg-teal-300" : ""} text-white no-underline  flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaClipboardList/> 
          <span>Leave</span>
        </NavLink>
        <NavLink to="/admin-dashboard/attendance" className={({ isActive }) =>`${isActive ? "bg-teal-300" : ""} text-white no-underline  flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaCalendarAlt/> 
          <span>Attendance</span>
        </NavLink>
        <NavLink to="/admin-dashboard/salary" className={({ isActive }) =>`${isActive ? "bg-teal-300" : ""} text-white no-underline flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaMoneyBillWave/> 
          <span>Salary</span>
        </NavLink>
       
         
        
    </div>
    </div>
  )
}

export default AdminSidebar

