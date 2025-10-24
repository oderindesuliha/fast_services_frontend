import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PageTransition from './components/PageTransition';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminRegisterPage from './pages/auth/AdminRegisterPage';
import HomePage from './pages/public/HomePage';
import OrganizationsPage from './pages/public/OrganizationsPage';
import OrganizationDetailsPage from './pages/public/OrganizationDetailsPage';
import OrganizationRegistrationPage from './pages/public/OrganizationRegistrationPage';
import BookingPage from './pages/public/BookingPage';

import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner';
import { Role } from './context/AuthContext';

// Lazy load dashboard components for better performance
const AdminDashboard = React.lazy(() => import('./pages/dashboard/admin/AdminDashboard'));
const SystemStats = React.lazy(() => import('./pages/dashboard/admin/SystemStats'));
const ManageUsers = React.lazy(() => import('./pages/dashboard/admin/ManageUsers'));
const ManageOrganizations = React.lazy(() => import('./pages/dashboard/admin/ManageOrganizations'));
const ManageAppointments = React.lazy(() => import('./pages/dashboard/admin/ManageAppointments'));

// Organization Dashboard
const OrganizationDashboard = React.lazy(() => import('./pages/dashboard/organization/OrganizationDashboard'));
const OrgManageOfferings = React.lazy(() => import('./pages/dashboard/organization/ManageOfferings'));
const OrgBillingPage = React.lazy(() => import('./pages/dashboard/organization/BillingPage'));
const OrgProfilePage = React.lazy(() => import('./pages/dashboard/organization/OrganizationProfile'));
const OrgAppointmentManagement = React.lazy(() => import('./pages/dashboard/organization/AppointmentManagement'));
const StaffManagement = React.lazy(() => import('./pages/dashboard/organization/StaffManagement'));


// Customer Dashboard
const CustomerDashboard = React.lazy(() => import('./pages/dashboard/customer/CustomerDashboard'));
const UpcomingAppointments = React.lazy(() => import('./pages/dashboard/customer/UpcomingAppointments'));
const AppointmentHistory = React.lazy(() => import('./pages/dashboard/customer/AppointmentHistory'));
const CustomerProfile = React.lazy(() => import('./pages/dashboard/customer/CustomerProfile'));
const AppointmentDetailsPage = React.lazy(() => import('./pages/dashboard/customer/AppointmentDetailsPage'));

// Staff Dashboard
const StaffDashboard = React.lazy(() => import('./pages/dashboard/staff/StaffDashboard'));
const StaffProfile = React.lazy(() => import('./pages/dashboard/staff/StaffProfile'));

// Guest QR flow
const GuestQueuePage = React.lazy(() => import('./pages/guest/GuestQueuePage'));
const GuestServicesPage = React.lazy(() => import('./pages/guest/GuestServicesPage'));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <React.Suspense fallback={<div className="flex justify-center items-center h-screen"><Spinner /></div>}>
            <PageTransition>
              <Routes>
                {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="organizations" element={<OrganizationsPage />} />
                <Route path="organizations/:id" element={<OrganizationDetailsPage />} />
                <Route path="organizations/register" element={<OrganizationRegistrationPage />} />
                <Route path="book/:offeringId" element={<BookingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="admin-register" element={<AdminRegisterPage />} />
                <Route path="join-queue/:offeringId" element={<GuestQueuePage />} />
                <Route path="view-services/:orgId" element={<GuestServicesPage />} />
              </Route>

              {/* Super Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={[Role.SUPER_ADMIN]} />}>
                 <Route path="/admin" element={<AdminDashboard />}>
                      <Route index element={<Navigate to="stats" replace />} />
                      <Route path="stats" element={<SystemStats />} />
                      <Route path="users" element={<ManageUsers />} />
                      <Route path="organizations" element={<ManageOrganizations />} />
                      <Route path="appointments" element={<ManageAppointments />} />
                 </Route>
              </Route>
              
              {/* Organization Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={[Role.ORG_ADMIN]} />}>
                  <Route path="/organization" element={<OrganizationDashboard />}>
                    <Route index element={<Navigate to="offerings" replace />} />
                    <Route path="offerings" element={<OrgManageOfferings />} />
                    <Route path="staff" element={<StaffManagement />} />
                    <Route path="appointments" element={<OrgAppointmentManagement />} />
                    <Route path="billing" element={<OrgBillingPage />} />
                    <Route path="profile" element={<OrgProfilePage />} />
                  </Route>
                </Route>              {/* Staff Routes */}
              <Route element={<ProtectedRoute allowedRoles={[Role.STAFF]} />}>
                 <Route path="/staff" element={<StaffDashboard />}>
                    <Route index element={<Navigate to="queue" replace />} />
                    <Route path="queue" element={<div>Queue Management Interface</div>} />
                    <Route path="profile" element={<StaffProfile />} />
                 </Route>
              </Route>

              {/* Customer Routes */}
              <Route element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}>
                 <Route path="/customer" element={<CustomerDashboard />}>
                    <Route index element={<Navigate to="upcoming" replace />} />
                    <Route path="upcoming" element={<UpcomingAppointments />} />
                    <Route path="upcoming/:id" element={<AppointmentDetailsPage />} />
                    <Route path="history" element={<AppointmentHistory />} />
                    <Route path="profile" element={<CustomerProfile />} />
                 </Route>
              </Route>
              
              {/* Fallback Route - Always redirect to home page */}
              <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </React.Suspense>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;