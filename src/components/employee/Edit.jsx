import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: ''
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employee/${id}`
        );
        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee({
            name: emp.userId.name,
            maritalStatus: emp.maritalStatus,
            designation: emp.designation,
            salary: emp.salary,
            department: emp.department
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employee/${id}`,
        employee
      );
      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error || 'Something went wrong');
      }
    }
  };

  return (
    <>
      {departments.length > 0 ? (
        <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Insert Name"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    required
                  />
                </div>

                {/* Marital Status */}
                <div>
                  <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    id="maritalStatus"
                    value={employee.maritalStatus}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>

                {/* Designation */}
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    required
                  />
                </div>

                {/* Salary */}
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    required
                  />
                </div>

                {/* Department */}
                <div className="md:col-span-2">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    name="department"
                    id="department"
                    value={employee.department}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.dep_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
                >
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500">Loading...</div>
      )}
    </>
  );
};

export default Edit;
