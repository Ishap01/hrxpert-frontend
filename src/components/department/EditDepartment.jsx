import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const navigate = useNavigate()
    const [department,setDepartment]= useState([]);
    const[deptLoading, setDeptLoading] = useState(false);
    const {id}= useParams()
    const handleChange  = (e)=>{
  const {name , value} = e.target;
   setDepartment({...department,
    [name]:value,


   })
}
 const handleSubmit =async(e)=>{
 e.preventDefault();
 try{
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/department/${id}`,department,{
        headers:{
          // Authorization : `Bearer${localstorage.getItem('token)}`
        }
      });
      if(response.data.success){
        navigate("/admin-dashboard/department")
      }
  }
  catch(error){
    if(error.response && !error.response.data.success){
      alert(error.response.data.error)
    }
  }
 }
     useEffect(()=>{
    const fetchDepartments = async()=>{
      setDeptLoading(true);
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department/${id}`,{
          headers:{

          }
        })
        if(response.data.success){
         setDepartment(response.data.department)
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
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 sm:p-8 rounded-md shadow-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Department</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Department Name */}
          <div>
            <label
              htmlFor="dep_name"
              className="block text-sm font-medium text-gray-700"
            >
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              placeholder="Enter Department Name"
              value={department.dep_name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Edit Department
          </button>
        </form>
      </div>
    )}
  </>
);

}

export default EditDepartment
