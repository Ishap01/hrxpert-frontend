import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useAuth } from '../../context/authContext';

const Payslip = () => {
  const {user} = useAuth();
  const [salaryData, setSalaryData] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
       
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/salary/my-payslip/${user.employeeId}`);
      if (res.data && res.data.success && res.data.salary) {
        setSalaryData(res.data.salary);
        console.log(salaryData)
        setMessage('');
      } else {
        setSalaryData(null);
        setMessage('Payslip not generated yet.');
      }
    } catch (error) {
      setSalaryData(null);
      setMessage('Payslip not generated yet.');
    }
  };

 
  const sendNotification = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/notification/send`, {
        employeeId: salaryData.employeeId.employeeId,
       
        message: `Payslip downloaded by  ${salaryData.employeeId.employeeId}`
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };


  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Payslip for ${salaryData.employeeId.employeeId}`, 10, 10);
    doc.text(`Basic Salary: ₹${salaryData.basicSalary}`, 10, 20);
    doc.text(`Allowances: ₹${salaryData.allowances}`, 10, 30);
    doc.text(`Deductions: ₹${salaryData.deduction}`, 10, 40);
    doc.text(`Pay Date: ${new Date(salaryData.payDate).toLocaleDateString()}`, 10, 50);
    doc.save(`Payslip_${salaryData.employeeId.employeeId}.pdf`);

    await sendNotification(); 
  };

 return (
  <div className="min-h-screen bg-teal-50 flex items-center justify-center px-3 sm:px-4">
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-700 text-center mb-3 sm:mb-4">
        Payslip Download
      </h2>

      <div className="text-center">
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-teal-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover:bg-teal-700 transition duration-200"
        >
          Find Current Payslip
        </button>
      </div>

      {/* Payslip data block */}
      {salaryData && (
        <div className="p-4 sm:p-6 rounded-lg shadow-inner bg-gray-50 space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-teal-800 text-center sm:text-left">
            Payslip Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-gray-800">
            <p><strong>Employee ID:</strong> {salaryData.employeeId.employeeId}</p>
            <p><strong>Basic Salary:</strong> ₹{salaryData.basicSalary}</p>
            <p><strong>Allowances:</strong> ₹{salaryData.allowances}</p>
            <p><strong>Deductions:</strong> ₹{salaryData.deduction}</p>
            <p><strong>Pay Date:</strong> {new Date(salaryData.payDate).toLocaleDateString()}</p>
          </div>

          <div className="pt-3 sm:pt-4 text-center sm:text-left">
            <button
              onClick={generatePDF}
              className="w-full sm:w-auto bg-teal-700 text-white px-4 sm:px-6 py-2 rounded hover:bg-teal-800 transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}

      {/* Error/No data message */}
      {message && (
        <div className="mt-2 text-center text-red-600 font-medium text-sm sm:text-base">
          {message}
        </div>
      )}
    </div>
  </div>
);

};

export default Payslip;
