import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";

const AdminPageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop */}
      <div className="hidden md:block w-64">
        <AdminSidebar />
      </div>

      {/* Sidebar mobile (overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 flex">
          <div className="w-64 bg-gray-800 text-white h-full shadow-lg">
            <AdminSidebar closeSidebar={closeSidebar} />
          </div>
          <div className="flex-1 bg-black/40" onClick={closeSidebar} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={toggleSidebar} />
        <div className="p-4 md:p-6 flex-1 overflow-auto bg-gray-100">
          {/* Nested routes render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPageLayout;
