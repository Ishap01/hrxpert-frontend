import React, { useEffect, useState } from "react";
import axios from "axios";
import AttendanceTable from "./AttendanceTable";

const AttendanceManager = () => {
  const [employees, setEmployees] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [markedStatus, setMarkedStatus] = useState({});
  const [message, setMessage] = useState("");

  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        if (res.data && Array.isArray(res.data.employees)) {
          // Map to required fields
          const simplified = res.data.employees.map(emp => ({
            employeeId: emp.employeeId,
            name: emp.userId?.name || "Unknown",
            department: emp.department?.dep_name || "N/A"
          }));
          setEmployees(simplified);
        } else {
          console.warn("Unexpected employee response format:", res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleMark = async (employeeId, status) => {
    try {
      await axios.post("http://localhost:5000/api/attendance", {
        employeeId,
        date,
        status
      });
      setMarkedStatus((prev) => ({ ...prev, [employeeId]: status }));
      setMessage(`✅ Marked ${employeeId} as ${status}`);
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("❌ Error marking attendance:", err);
      setMessage("❌ Failed to mark attendance");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const toggleReport = async () => {
    if (!showReport) {
      setLoadingReport(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/attendance?date=${date}`);
        setReportData(res.data);
      } catch (err) {
        console.error("❌ Error fetching attendance report:", err);
        setReportData([]);
      }
      setLoadingReport(false);
    }
    setShowReport(!showReport);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-center">Attendance Management</h2>

      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={toggleReport}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showReport ? "Hide Report" : "View Attendance Report"}
        </button>
      </div>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      {!showReport ? (
        employees.length > 0 ? (
          <AttendanceTable
            headers={["S No.", "Employee ID", "Name", "Department", "Action"]}
            rows={employees}
            onMark={handleMark}
            markedStatus={markedStatus}
          />
        ) : (
          <p>No employees available to mark attendance.</p>
        )
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Attendance Report for {date}</h3>
          {loadingReport ? (
            <p>Loading...</p>
          ) : reportData.length > 0 ? (
            <AttendanceTable
              headers={["S No.", "Employee ID", "Name", "Department", "Status"]}
              rows={reportData}
            />
          ) : (
            <p>No attendance records found for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceManager;
