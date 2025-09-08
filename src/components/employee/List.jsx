import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, EmployeeButton } from '../../../utils/EmployeeHelper'
import axios from 'axios'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
 const [filteredEmployees , setFilteredEmployees] = useState([])
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee`)
        if (response.data.success) {
          let sno = 1
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name ?? "N/A",
            name: emp.userId?.name ?? "N/A",
            dob: new Date(emp.dob).toLocaleDateString(),
            profileimage: (
              <img
                src={`${import.meta.env.VITE_API_URL}/${emp.userId.profileimage}`}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ),
            action: <EmployeeButton _id={emp._id} />
          }))
          setEmployees(data)
          setFilteredEmployees(data)
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Something went wrong")
      } finally {
        setEmpLoading(false)
      }
    }

    fetchEmployees()
  }, [])
 const handleFilter = (e) => {
  const value = e.target.value.toLowerCase();
  const records = employees.filter((emp) =>
    emp.name.toLowerCase().includes(value)
  );
  setFilteredEmployees(records);
};
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center my-4">
        <input type="text" placeholder="Search By Dep Name" className="px-4 py-1 border" onChange={handleFilter}/>
        <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 rounded text-white">
          Add New Employee
        </Link>
      </div>

      <div className='mt-6'>
        <DataTable columns={columns} data={filteredEmployees} progressPending={empLoading} pagination />
      </div>
    </div>
  )
}

export default List
