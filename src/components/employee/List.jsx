import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, EmployeeButton } from '../../../utils/EmployeeHelper';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee`);
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name ?? 'N/A',
            name: emp.userId?.name ?? 'N/A',
            dob: new Date(emp.dob).toLocaleDateString(),
            profileimage: (
              <img
                src={`${import.meta.env.VITE_API_URL}/${emp.userId.profileimage}`}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ),
            action: <EmployeeButton _id={emp._id} />
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        alert(error?.response?.data?.error || 'Something went wrong');
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800">Manage Employees</h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-6">
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleFilter}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="inline-block text-center px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
        >
          Add New Employee
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg shadow-sm">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          progressPending={empLoading}
          pagination
          responsive
          highlightOnHover
          persistTableHead
        />
      </div>
    </div>
  );
};

export default List;
