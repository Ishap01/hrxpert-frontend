import React, {use, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/authContext';

const Add = () => {
  const {user} = useAuth()
  const [leave, setLeave] = useState({
    userId: user._id,
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    const {name, value} = e.target;
    setLeave((prevState) => ({...prevState, [name]: value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/leave/add`,leave,{
          headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if(response.data.success){
         navigate(`/employee-dashboard/leaves/${user._id}`)
        }
      }catch(error){
            if(error.response && !error.response.data.success){
               alert(error.response.data.error)  
        }
      }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Request For Leave
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium mb-1 text-gray-700">Leave Type:</label>
            <select 
              name="leaveType"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required>
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Earned Leave">Annual Leave</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1 text-gray-700">From Date:</label>
              <input type="date" name="startDate" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required/>
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1 text-gray-700">To Date:</label>
              <input type="date" name="endDate" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Reason:</label>
            <textarea name="reason" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" rows="3" placeholder="Enter reason..." />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Apply Leave
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add