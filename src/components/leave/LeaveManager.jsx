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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/leave`,{
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
      <div className="p-6 max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold">Manage Leaves</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <input
            type="text"
            placeholder="Search By Emp ID"
            className="px-4 py-2 border rounded w-full sm:w-64"
            onChange={filterByInput}
          />

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded"
              onClick={() => filterByButton("Pending")}
            >
              Pending
            </button>
            <button
              className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded"
              onClick={() => filterByButton("Approved")}
            >
              Approved
            </button>
            <button
              className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded"
              onClick={() => filterByButton("Rejected")}
            >
              Rejected
            </button>
          </div>
        </div>

        <div className="mt-6">
          <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
      </div>
    ) : (
      <div className="text-center mt-10 text-gray-600">Loading...</div>
    )}
  </>
);

};

export default LeaveManager;
