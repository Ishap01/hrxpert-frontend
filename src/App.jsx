import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import EmployeeDashboard from './components/employeeDashboard/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminNavbar from './components/dashboard/Navbar';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';

import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';

import AttendanceManager from './components/attendance/AttendanceManager';
import LeaveManager from './components/leave/LeaveManager';
import LeaveList from './components/employeeDashboard/List';
import AddLeave from './components/leave/Add';
import LeaveDetail from './components/leave/LeaveDetail';

import AdminSidebar from './components/dashboard/AdminSidebar';
import PrivateRoute from '../utils/PrivateRoutes';
import SalaryManager from './components/salary/SalaryManager'
import ViewSalary from './components/salary/ViewSalary';
import EmployeeLayout from './pages/EmployeeDashboardLayout';
import PayslipDownload from './components/employeeDashboard/PayslipDownload';
import MyProfile from './components/employeeDashboard/MyProfile';
// Admin layout component directly in this file
const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="w-full md:w-64">
        <AdminSidebar />
      </div>

     <div className="flex-1 flex flex-col">
      <AdminNavbar/>
      <div className="p-4 md:p-6 flex-1 overflow-auto">
        <Outlet />
      </div>
     </div>
    </div>
  );
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

       
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

      
        <Route
  path="/employee-dashboard"
  element={
    <PrivateRoute>
      <EmployeeLayout />
    </PrivateRoute>
  }
>
  <Route index element={<EmployeeDashboard />} />
  <Route path="myprofile/:id" element={<MyProfile />} />
  <Route path="payslip" element={<PayslipDownload />} />
  <Route path="leaves/:id" element={<LeaveList />} />
  <Route path="add-leave" element={<AddLeave />} />
</Route>
       
       <Route
  path="/admin-dashboard"
  element={
    <PrivateRoute>
      <AdminLayout />
    </PrivateRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="department" element={<DepartmentList />} />
  <Route path="add-department" element={<AddDepartment />} />
  <Route path="department/:id" element={<EditDepartment />} />
  <Route path="employees" element={<List />} />
  <Route path="add-employee" element={<Add />} />
  <Route path="employee/:id" element={<View />} />
  <Route path="employee/edit/:id" element={<Edit />} />
  <Route path="attendance" element={<AttendanceManager />} />
  <Route path="leaves" element={<LeaveManager />} />
  <Route path="leaves/:id" element={<LeaveDetail />} />
  <Route path="employee/leaves/:id" element={<LeaveList />} />
  <Route path="salary" element={<SalaryManager />} /> 
  <Route path="employee/salary/:id" element={<ViewSalary />} /> 
</Route>

      
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
