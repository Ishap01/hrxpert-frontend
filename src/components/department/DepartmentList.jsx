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
        const response = await axios.get('http://localhost:5000/api/department',{
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
   <>{deptLoading?<div>Loading....</div>:
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search By Dep Name' className='px-4 py-0.5' onChange={filterDepartments}/>
        <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-blue-400 rounded text-white'>Add New Department</Link>
        

      </div>
      <div className='mt-5'>
         <DataTable columns={columns}
      data={filteredDept}
      pagination
      />
      </div>
     
    </div>
    }</>
  )
}

export default DepartmentList
