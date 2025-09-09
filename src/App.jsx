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

import PrivateRoute from '../utils/PrivateRoutes';
import SalaryManager from './components/salary/SalaryManager';
import ViewSalary from './components/salary/ViewSalary';
import EmployeeLayout from './pages/EmployeeDashboardLayout';
import PayslipDownload from './components/employeeDashboard/PayslipDownload';
import MyProfile from './components/employeeDashboard/MyProfile';
import AdminPageLayout from './pages/AdminPageLayout';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Employee routes with layout */}
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

        {/* Admin routes with AdminDashboard layout */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminPageLayout />
            </PrivateRoute>
          }
        >
          {/* <Route index element={<h2>Welcome to Admin Dashboard</h2>} /> */}
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
