import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';

import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import PatientsPage from '../pages/Patients/PatientsPage';
import DoctorsPage from '../pages/Doctors/DoctorsPage';
import AppointmentsPage from '../pages/Appointments/AppointmentsPage';
import AdmissionsPage from '../pages/Admissions/AdmissionsPage';
import LaboratoryPage from '../pages/Laboratory/LaboratoryPage';
import PharmacyPage from '../pages/Pharmacy/PharmacyPage';
import BillingPage from '../pages/Billing/BillingPage';
import ReportsPage from '../pages/Reports/ReportsPage';
import StaffPage from '../pages/Staff/StaffPage';
import NotificationsPage from '../pages/Notifications/NotificationsPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import LogoutPage from '../pages/Logout/LogoutPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Layout Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="laboratory" element={<LaboratoryPage />} />
        <Route path="pharmacy" element={<PharmacyPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="logout" element={<LogoutPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
