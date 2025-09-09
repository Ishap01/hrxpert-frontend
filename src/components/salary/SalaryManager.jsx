import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SalaryManager = () => {
  const [salary, setSalary] = useState({
    department: '', // added to initial state
    employeeId: '',
    basicSalary: '',
    allowances: '',
    deduction: '',
    payDate: ''
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/salary/add`,
        salary
      );
      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error || 'Something went wrong');
      }
    }
  };

  const handleDepartment = async (e) => {
    const selectedDepartment = e.target.value;
    setSalary((prev) => ({ ...prev, department: selectedDepartment, employeeId: '' })); // reset employee on dept change
    const emps = await getEmployees(selectedDepartment);
    setEmployees(emps);
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 md:p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Add Salary</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={salary.department}
                  onChange={(e) => {
                    handleChange(e);
                    handleDepartment(e);
                  }}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
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

              {/* Employee */}
              <div className="md:col-span-2">
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                  Employee
                </label>
                <select
                  id="employeeId"
                  name="employeeId"
                  value={salary.employeeId}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                  disabled={!salary.department}
                >
                  <option value="">
                    {salary.department ? 'Select Employee' : 'Select Department first'}
                  </option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary */}
              <div>
                <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-700 mb-1">
                  Basic Salary
                </label>
                <input
                  id="basicSalary"
                  type="number"
                  name="basicSalary"
                  value={salary.basicSalary}
                  onChange={handleChange}
                  placeholder="Basic salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                  min="0"
                />
              </div>

              {/* Allowances */}
              <div>
                <label htmlFor="allowances" className="block text-sm font-medium text-gray-700 mb-1">
                  Allowances
                </label>
                <input
                  id="allowances"
                  type="number"
                  name="allowances"
                  value={salary.allowances}
                  onChange={handleChange}
                  placeholder="Allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                  min="0"
                />
              </div>

              {/* Deductions */}
              <div>
                <label htmlFor="deduction" className="block text-sm font-medium text-gray-700 mb-1">
                  Deduction
                </label>
                <input
                  id="deduction"
                  type="number"
                  name="deduction"
                  value={salary.deduction}
                  onChange={handleChange}
                  placeholder="Deduction"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                  min="0"
                />
              </div>

              {/* Pay Date */}
              <div className="md:col-span-2">
                <label htmlFor="payDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Date
                </label>
                <input
                  id="payDate"
                  type="date"
                  name="payDate"
                  value={salary.payDate}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mt-10">Loading...</div>
      )}
    </>
  );
};

export default SalaryManager;
