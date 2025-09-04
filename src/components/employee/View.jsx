import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const View = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`)
        if (response.data.success) {
          console.log(response.data.employee)
          setEmployee(response.data.employee)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    }
    fetchEmployee()
  }, [])

  return (
    <>
      {employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Employee Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="bg-gray-50 p-4 rounded-full shadow-inner border w-fit">
                <img
                  src={`http://localhost:5000/${employee.userId.profileimage}`}
                  alt="profile"
                  className="w-40 h-40 object-cover rounded-full border-2 border-teal-500"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-5">
              <Detail label="Name" value={employee.userId.name} />
              <Detail label="Employee ID" value={employee.employeeId} />
              <Detail
                label="Date of Birth"
                value={new Date(employee.dob).toLocaleDateString()}
              />
              <Detail label="Gender" value={employee.gender} />
              <Detail label="Department" value={employee.department?.dep_name} />
              <Detail label="Marital Status" value={employee.maritalStatus} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10">Loading...</div>
      )}
    </>
  )
}

// Reusable label-value pair
const Detail = ({ label, value }) => (
  <div className="flex">
    <p className="w-40 font-semibold text-gray-700">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
)

export default View
