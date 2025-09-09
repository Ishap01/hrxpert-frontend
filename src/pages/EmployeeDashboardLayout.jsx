// EmployeeLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/employeeDashboard/EmployeeNavbar";
import Sidebar from "../components/employeeDashboard/Sidebar";

const EmployeeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto bg-gray-100 p-2 md:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
