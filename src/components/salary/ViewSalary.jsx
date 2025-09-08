import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ViewSalary = () => {
    const[salaries , setSalaries] = useState(null)
     const[filteredSalaries , setFilteredSalaries] = useState(null)
     const {id} = useParams();
     let sno = 1;
     const fetchSalaries = async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/salary/${id}`,{
                headers:{

                }
            })
           console.log(response.data)
           if(response.data.success){
            setSalaries(response.data.salary);
            setFilteredSalaries(response.data.salary);
        }

        }catch(error){
             alert(error.message);
        }
     }
     useEffect(()=>{
     fetchSalaries();
     },[])
     const filterSalaries = (q)=>{
        const filterRecords = salaries.filter((leave)=>
            leave.employeeId.toLocalLowerCase().includes(q.toLocalLowerCase())
    ) 
    setFilteredSalaries(filterRecords)
}
  return (
    <>
    {filteredSalaries === null?(
        <div>Loading...</div>

    ):(
        <div className='overflow-x-auto p-3 sm:p-5'>
            <div className='text-center mb-4'>
                <h2 className='text-xl sm:text-2xl font-bold'>
                   Salary History
                </h2>

            </div>
            <div className='flex justify-end my-3'>
                <input type="text" placeholder='Search By Emp ID' 
                className='border px-2 py-1 rounded-md border-gray-300 w-full sm:w-64 text-sm sm:text-base'
                onChange={filterSalaries}
                />

                

            </div>

    {filteredSalaries.length > 0 ?(
       <table className='w-full text-xs sm:text-sm text-left text-gray-500 border-collapse'>
        
        <thead className='text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
            <tr>
                <th className='px-2 sm:px-6 py-2 sm:py-3'>SNO</th>
                <th className='px-2 sm:px-6 py-2 sm:py-3'>Emp ID</th>
                <th className='px-2 sm:px-6 py-2 sm:py-3'>Salary</th>
                <th className='px-2 sm:px-6 py-2 sm:py-3'>Allowance</th>
                <th className='px-2 sm:px-6 py-2 sm:py-3'>Deduction</th>
                <th className='px-2 sm:px-6 py-2 sm:py-3'>Total</th>
                <th className='px-2 sm:px-6 py-2 sm:py-3'>Pay Date</th>
            </tr>
        </thead>
        <tbody>
            {filteredSalaries.map((salary)=>(
                <tr key={salary.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td className='px-2 sm:px-6 py-2 sm:py-3'>{sno++}</td>
                     <td className='px-2 sm:px-6 py-2 sm:py-3'>{salary.employeeId.employeeId}</td>
                      <td className='px-2 sm:px-6 py-2 sm:py-3'>{salary.basicSalary}</td>
                       <td className='px-2 sm:px-6 py-2 sm:py-3'>{salary.allowances}</td>
                        <td className='px-2 sm:px-6 py-2 sm:py-3'>{salary.deduction}</td>
                         <td className='px-2 sm:px-6 py-2 sm:py-3'>{salary.netSalary}</td>
                          <td className='px-2 sm:px-6 py-2 sm:py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                </tr>
            ))}
        </tbody>
       </table>
    ):<div>No Records</div>}
    </div>
    )}
      
    
    </>
  )
}

export default ViewSalary

