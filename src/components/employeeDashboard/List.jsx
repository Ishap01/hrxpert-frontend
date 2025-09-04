import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {useAuth} from '../../context/authContext';
import axios from 'axios'

const List = () => {
  const {user} = useAuth()
  const [leaves , setLeaves] = useState(null)
  let sno = 1;
  const {id} =  useParams()
  const fetchLeaves = async () => {
      try{
          const response = await axios.get(`http://localhost:5000/api/leave/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          
          if(response.data.success){
            setLeaves(response.data.leaves);
          }
        }catch(error){
              if(error.response && !error.response.data.success){
                 alert(error.response.data.error)  
          }
        }
      };

      useEffect(() => {
        fetchLeaves();
      }, []);

      if(!leaves){
        return <div className='text-center'>Loading...</div>
      }

  return (
    <div className='p-6'>
        <div className='text-center'>
        <h3 className='text-lg sm:text-xl md:text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-end items-center'>
            {user?.role === "Employee" &&(
            <Link 
                to="/employee-dashboard/add-leave"
                className='px-4 py-1 bg-teal-600 rounded tect-white mb-4'>Add New Leave</Link>)}
        </div>

            <div className="overflow-x-auto">
            <table className='min-w-max w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                    <tr>
                        <th className='border px-6 py-3'>SNo</th>
                        <th className='border px-6 py-3'>Leave Type</th>
                        <th className='border px-6 py-3'>From</th>
                        <th className='border px-6 py-3'>To</th>
                        <th className='border px-6 py-3'>Reason</th>
                        <th className='border px-6 py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className='border px-2 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'>{sno++}</td>
                            <td className='border px-2 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'>{leave.leaveType}</td>
                            <td className='border px-2 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className='border px-2 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className='border px-2 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'>{leave.reason}</td>
                            <td className='border px-2 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base'>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        
    </div>
  )
}

export default List