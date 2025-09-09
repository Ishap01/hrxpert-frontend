import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

   
const LeaveDetail = () => {
    const {id} = useParams()
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate();

     useEffect(()=>{
    const fetchLeave = async()=>{
     
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leave/detail/${id}`,{
          headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if(response.data.success){
            console.log(response.data.employee);
         setLeave(response.data.leave)
        }
      }catch(error){
            if(error.response && !error.response.data.success){
               alert(error.response.data.error)  
        }
      }
    }
    fetchLeave()
    },
  [])

  const changeStatus = async (id, status) => {
    try{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/leave/${id}`,{status},{
          headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if(response.data.success){
            navigate('/admin-dashboard/leaves')
        }
      }catch(error){
            if(error.response && !error.response.data.success){
               alert(error.response.data.error)  
        }
      }
  }
return (
  <>
    {leave ? (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 sm:p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Leave Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={`${import.meta.env.VITE_API_URL}/${leave.employeeId.userId.profileimage}`}
              alt="profile"
              className="rounded-full border w-40 h-40 sm:w-64 sm:h-64 object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <Detail label="Name" value={leave.employeeId.userId.name} />
            <Detail label="Employee ID" value={leave.employeeId.employeeId} />
            <Detail label="Leave Type" value={leave.leaveType} />
            <Detail label="Reason" value={leave.reason} />
            <Detail label="Department" value={leave.employeeId.department.dep_name} />
            <Detail
              label="Start Date"
              value={new Date(leave.startDate).toLocaleDateString()}
            />
            <Detail
              label="End Date"
              value={new Date(leave.endDate).toLocaleDateString()}
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-lg font-bold">
                {leave.status === "Pending" ? "Action:" : "Status:"}
              </p>
              {leave.status === "Pending" ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => changeStatus(leave._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => changeStatus(leave._id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className="font-medium">{leave.status}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center mt-10 text-gray-600">Loading...</div>
    )}
  </>
);

}

export default LeaveDetail