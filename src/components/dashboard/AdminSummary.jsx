import React, { useEffect, useState } from 'react'
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBill,
  FaTimesCircle,
  FaUsers
} from 'react-icons/fa'
import SummaryCard from './SummaryCard'

import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/summary')
        setSummary(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSummary()
  }, [])

  if (!summary) {
    return <div className="text-center mt-10">Loading Dashboard...</div>
  }

  return (
    <div className="pt-0 px-6 pb-6 bg-gray-100 h-140 font-sans">
      <h3 className="text-3xl  py-5 font-bold text-teal-700 text-center mb-10">Admin Dashboard Overview</h3>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          icon={FaUsers}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-500"
        />
        <SummaryCard
          icon={FaBuilding}
          text="Departments"
          number={summary.totalDepartments}
          color="bg-blue-300"
        />
        <SummaryCard
          icon={FaMoneyBill}
          text="Monthly Pay"
          number={`$${summary.totalSalary}`}
          color="bg-red-400"
        />
      </div>

      {/* Leave Overview */}
      <div className='mt-12'>
      <h4 className="text-center  text-2xl font-bold">Leave Overview</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
       <SummaryCard
          icon={FaFileAlt}
          text="Leave Applied"
          number={`${summary.leaveSummary.appliedFor}`}
          color="bg-blue-400"
        />
        <SummaryCard
          icon={FaCheckCircle}
          text="Leave Approved"
          number={`${summary.leaveSummary.approved}`}
          color="bg-green-400"
        />
        <SummaryCard
          icon={FaTimesCircle}
          text="Leave Rejected"
          number={`${summary.leaveSummary.rejected}`}
          color="bg-red-400"
        />
        <SummaryCard
          icon={FaHourglassHalf}
          text="Leave Pending"
          number={`${summary.leaveSummary.pending}`}
          color="bg-yellow-400"
        />
      </div>
      </div>
    </div>
  )
}

export default AdminSummary
