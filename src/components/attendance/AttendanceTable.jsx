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
                className="px-4 py-3 text-left border-b text-gray-700 font-semibold whitespace-nowrap"
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
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2 border-b whitespace-nowrap">{idx + 1}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{row.employeeId}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{row.name}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{row.department}</td>
                <td className="px-4 py-2 border-b">
                  {onMark ? (
                    <div className="flex flex-wrap gap-2">
                      {["Present", "Absent", "Leave"].map((status) => (
                        <button
                          key={status}
                          onClick={() => onMark(row.employeeId, status)}
                          className={`px-3 py-1 rounded text-white text-sm font-medium 
                            ${
                              markedStatus[row.employeeId] === status
                                ? status === "Present"
                                  ? "bg-green-600"
                                  : status === "Absent"
                                  ? "bg-red-600"
                                  : "bg-yellow-600"
                                : status === "Present"
                                ? "bg-green-300 hover:bg-green-400"
                                : status === "Absent"
                                ? "bg-red-300 hover:bg-red-400"
                                : "bg-yellow-300 hover:bg-yellow-400"
                            }`}
                          aria-pressed={markedStatus[row.employeeId] === status}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
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
