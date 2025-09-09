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
    {filteredSalaries === null ? (
      <div className="text-center py-10">Loading...</div>
    ) : (
      <div className="p-3 sm:p-5">
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">Salary History</h2>
        </div>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search By Emp ID"
            className="border px-3 py-2 rounded-md border-gray-300 w-full sm:w-64 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={filterSalaries}
          />
        </div>

        {filteredSalaries.length > 0 ? (
          <>
            {/* Desktop Table */}
            <table className="hidden sm:table min-w-full text-sm text-left text-gray-700 border-collapse">
              <thead className="bg-gray-50 border border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, index) => (
                  <tr
                    key={salary.id}
                    className={`bg-white border-b ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deduction}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Vertical Table */}
            <div className="sm:hidden space-y-4">
              {filteredSalaries.map((salary, index) => (
                <div
                  key={salary.id}
                  className="bg-white shadow rounded-md p-4 border border-gray-200"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">SNO:</span>
                    <span>{index + 1}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Emp ID:</span>
                    <span>{salary.employeeId.employeeId}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Salary:</span>
                    <span>{salary.basicSalary}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Allowance:</span>
                    <span>{salary.allowances}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Deduction:</span>
                    <span>{salary.deduction}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total:</span>
                    <span>{salary.netSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Pay Date:</span>
                    <span>{new Date(salary.payDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-gray-600">No Records</div>
        )}
      </div>
    )}
  </>
);

}

export default ViewSalary

