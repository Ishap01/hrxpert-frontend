// components/leave/LeaveManager.jsx
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { LeaveButtons, columns } from "../../../utils/LeaveHelper.jsx";
import axios from "axios";

const LeaveManager = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
  const fetchLeaves = async () => {
  try {
        const response = await axios.get('http://localhost:5000/api/leave',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        
        if (response.data.success) {
          let sno = 1
          const data = response.data.leaves.map((leave) => ({
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId ?? "N/A",
            name: leave.employeeId?.userId?.name ?? "N/A",
            leaveType: leave.leaveType ?? "N/A",
            department: leave.employeeId?.department?.dep_name ?? "N/A",
            days:
            new Date(leave.endDate).getDate() - 
            new Date(leave.startDate).getDate(),
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />
          }))
          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        if(error.response && !error.response.data.success){{
          alert(error?.response?.data?.error || "Something went wrong");
        }}
      }
}
useEffect(() => {
  fetchLeaves();
}, []);

const filterByInput = (e) => {
  const data = leaves.filter((leave) => 
    leave.employeeId
    .toLowerCase()
    .includes(e.target.value.toLowerCase()));
  setFilteredLeaves(data);
};
const filterByButton = (status) => {
  const data = leaves.filter((leave) => 
    leave.status
    .toLowerCase()
    .includes(status.toLowerCase()));
  setFilteredLeaves(data);
};


  return (
    <>
    {filteredLeaves ? (
    <div className="p-6">
      <div className='text-center'>
        <h3 className='text-2x1 font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input 
                type="text"
                placeholder="Search By Emp ID"
                className='px-4 py-0.5 border'
                onChange={filterByInput}
            />
            <div className="flex space-x-2">
            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700" 
             onClick={()=> filterByButton("Pending")}>Pending</button>
            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
             onClick={()=> filterByButton("Approved")}>Approved</button>
            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
             onClick={()=> filterByButton("Rejected")}>Rejected</button>
            </div>
        </div>
      <div className="mt-3">
      <DataTable 
        columns={columns}
        data={filteredLeaves}
        pagination />
      </div>
    </div>
    ): <div className="text-center">Loading...</div>}
    </>
  );
};

export default LeaveManager;
