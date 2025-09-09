import React, { useState } from 'react'
import{useNavigate}from 'react-router-dom'
import axios from 'axios'
const AddDepartment = () => {
  const navigate = useNavigate();
  const[department, setDepartment] = useState({
    dep_name:"",
    description:""
  });
const handleChange  = (e)=>{
  const {name , value} = e.target;
   setDepartment({...department,
    [name]:value,


   })
}
const handleSubmit =async(e)=>{
  e.preventDefault();
  try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/department/add`,department,{
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
 return (
  <div className="max-w-3xl mx-auto mt-10 bg-white p-6 sm:p-8 rounded-md shadow-md w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Department</h2>
    
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Department Name */}
      <div>
        <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
          Department Name
        </label>
        <input
          type="text"
          name="dep_name"
          placeholder="Enter Department Name"
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Enter Description"
          rows="4"
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Add Department
      </button>
    </form>
  </div>
);

}

export default AddDepartment
