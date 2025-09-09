import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns,  DepartmentButton } from '../../../utils/DepartmentHelper'
import { useEffect } from 'react'
import axios from 'axios';
const DepartmentList = () => {
  const[departments , setDepartments] = useState([])
  const [filteredDept , setFilteredDept] = useState([])
  const[deptLoading , setDeptLoading] = useState(false);
  const onDepartmentDelete = async(id)=>{
    const data =  departments.filter(dep=> dep._id !== id)
    setDepartments(data)
  }
  const filterDepartments =(e)=>{
    const records = departments.filter((dep)=>dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
     setFilteredDept(records);
  }
  useEffect(()=>{
    const fetchDepartments = async()=>{
      setDeptLoading(true);
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department`,{
          headers:{

          }
        })
        if(response.data.success){
          let sno=1;
          const data = await response.data.departments.map((dep)=>(
            {
              _id:dep._id,
              sno:sno++,
              dep_name: dep.dep_name,
              action:(<DepartmentButton _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)

            }
          ))
          setDepartments(data);
          setFilteredDept(data)
        }
      }catch(error){
            if(error.response && !error.response.data.success){
               alert(error.response.data.error)  
        }
      }finally{
        setDeptLoading(false)
      }
    }
    fetchDepartments()
    },
  [])
  return (
  <>
    {deptLoading ? (
      <div className="text-center mt-10 text-gray-600">Loading...</div>
    ) : (
      <div className="p-4 sm:p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Manage Departments</h3>
        </div>

        {/* Search and Add button section */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <input
            type="text"
            placeholder="Search by department name"
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={filterDepartments}
          />
          <Link
            to="/admin-dashboard/add-department"
            className="inline-block text-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add New Department
          </Link>
        </div>

        {/* Table section */}
        <div className="mt-6 overflow-x-auto rounded-md">
          <DataTable
            columns={columns}
            data={filteredDept}
            pagination
            responsive
            highlightOnHover
          />
        </div>
      </div>
    )}
  </>
);

}

export default DepartmentList
