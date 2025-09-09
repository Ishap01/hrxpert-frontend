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
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leave/${id}`,{
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
  <div className="p-4 sm:p-6">
    {/* Heading */}
    <div className="text-center mb-4">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
        Manage Leaves
      </h3>
    </div>

    {/* Add Button */}
    <div className="flex justify-end items-center mb-3">
      {user?.role === 'Employee' && (
        <Link
          to="/employee-dashboard/add-leave"
          className="px-3 sm:px-4 py-1 sm:py-2 bg-teal-600 text-white rounded text-sm sm:text-base"
        >
          Add New Leave
        </Link>
      )}
    </div>

    {/* Responsive Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs sm:text-sm text-left text-gray-500 border border-gray-200">
        <thead className="uppercase bg-gray-50 text-gray-700 text-[10px] sm:text-xs">
          <tr>
            <th className="border px-2 sm:px-4 py-2">SNo</th>
            <th className="border px-2 sm:px-4 py-2">Leave Type</th>
            <th className="border px-2 sm:px-4 py-2">From</th>
            <th className="border px-2 sm:px-4 py-2">To</th>
            <th className="border px-2 sm:px-4 py-2">Reason</th>
            <th className="border px-2 sm:px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="border px-2 sm:px-4 py-2">{sno++}</td>
              <td className="border px-2 sm:px-4 py-2">{leave.leaveType}</td>
              <td className="border px-2 sm:px-4 py-2">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="border px-2 sm:px-4 py-2">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="border px-2 sm:px-4 py-2">{leave.reason}</td>
              <td className="border px-2 sm:px-4 py-2">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default List