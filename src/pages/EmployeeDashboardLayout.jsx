import { Outlet } from "react-router-dom";
import Navbar from "../components/employeeDashboard/EmployeeNavbar";
import Sidebar from "../components/employeeDashboard/Sidebar";

const EmployeeLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar /> 
       <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;