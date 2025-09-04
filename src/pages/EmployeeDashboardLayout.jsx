import { Outlet } from "react-router-dom";
import Navbar from "../components/employeeDashboard/EmployeeNavbar";
import Sidebar from "../components/employeeDashboard/Sidebar";

const EmployeeLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '16rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar /> 
       <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#f3f4f6', padding: '1rem' }}>
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;