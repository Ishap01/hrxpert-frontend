import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

   
const MyProfile = () => {
    const {id} = useParams()
    const [employee,setEmployee] = useState(null)
     useEffect(()=>{
    const fetchEmployee = async()=>{
     
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(response.data.success){
            console.log(response.data.employee);
         setEmployee(response.data.employee)
        }
      }catch(error){
            if(error.response && !error.response.data.success){
               alert(error.response.data.error)  
        }
      }
    }
    fetchEmployee()
    },
  [])
return (
  <>
    {employee ? (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
          Employee Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={`${import.meta.env.VITE_API_URL}/${employee.userId.profileimage}`}
              alt="profile"
              className="rounded-full border w-40 sm:w-56 md:w-72"
            />
          </div>

          {/* Employee Info */}
          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <p className="font-semibold">Name:</p>
              <p className="text-gray-700">{employee.userId.name}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <p className="font-semibold">Employee ID:</p>
              <p className="text-gray-700">{employee.employeeId}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <p className="font-semibold">Date of Birth:</p>
              <p className="text-gray-700">
                {new Date(employee.dob).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <p className="font-semibold">Gender:</p>
              <p className="text-gray-700">{employee.gender}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <p className="font-semibold">Department:</p>
              <p className="text-gray-700">{employee.department.dep_name}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <p className="font-semibold">Marital Status:</p>
              <p className="text-gray-700">{employee.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center mt-10">Loading...</div>
    )}
  </>
);

}

export default MyProfile;

