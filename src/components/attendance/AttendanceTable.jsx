import React from "react";

const AttendanceTable = ({ headers, rows, onMark, markedStatus = {} }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left border-b text-gray-700 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row, idx) => (
              <tr
                key={row._id || row.employeeId || idx}
                className="hover:bg-gray-100 transition-all"
              >
                <td className="px-4 py-2 border-b">{idx + 1}</td>
                <td className="px-4 py-2 border-b">{row.employeeId}</td>
                <td className="px-4 py-2 border-b">{row.name}</td>
                <td className="px-4 py-2 border-b">{row.department}</td>
                <td className="px-4 py-2 border-b">
                  {onMark ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onMark(row.employeeId, "Present")}
                        className={`px-3 py-1 rounded text-white text-sm font-medium ${
                          markedStatus[row.employeeId] === "Present"
                            ? "bg-green-600"
                            : "bg-green-300 hover:bg-green-400"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => onMark(row.employeeId, "Absent")}
                        className={`px-3 py-1 rounded text-white text-sm font-medium ${
                          markedStatus[row.employeeId] === "Absent"
                            ? "bg-red-600"
                            : "bg-red-300 hover:bg-red-400"
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => onMark(row.employeeId, "Leave")}
                        className={`px-3 py-1 rounded text-white text-sm font-medium ${
                          markedStatus[row.employeeId] === "Leave"
                            ? "bg-yellow-600"
                            : "bg-yellow-300 hover:bg-yellow-400"
                        }`}
                      >
                        Leave
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        row.status === "Present"
                          ? "bg-green-200 text-green-800"
                          : row.status === "Absent"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                No employee data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
