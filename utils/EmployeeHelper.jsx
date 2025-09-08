 import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// DataTable columns
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable:"true",
    width:"100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileimage,
    width:"90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width:"120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable:"true",
    width:"130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:"true"
  }
]

// Fetch departments
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department`)
    if (response.data.success) {
      return response.data.departments
    }
  } catch (error) {
    alert(error?.response?.data?.error || "Department fetch failed")
  }
}
//employess for salary form 
export const getEmployees = async (id) => {
  let employees
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee/department/${id}`)
    if (response.data.success) {
      return response.data.employees
    }
  } catch (error) {
    alert(error?.response?.data?.error || "Employee fetch failed")
  }
}
// Action buttons
export const EmployeeButton = ({ _id }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
      <button className="w-full sm:w-auto px-4 py-2 bg-teal-300 text-white text-sm rounded"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}>
        View
      </button>
      <button className="w-full sm:w-auto px-4 py-2 bg-red-400 text-white text-sm rounded"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}>
        Edit
      </button>
      <button className="w-full sm:w-auto px-4 py-2 bg-yellow-300 text-white text-sm rounded"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}>
        Salary
      </button>
      <button className="w-full sm:w-auto px-4 py-2 bg-blue-300 text-white text-sm rounded"
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${_id}`)}>
        Leave
      </button>
    </div>
  )
}
