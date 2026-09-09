export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
  DASHBOARD: {
    SUMMARY: '/api/dashboard/summary',
  },
  PATIENTS: {
    BASE: '/api/patients',
    BY_ID: (id) => `/api/patients/${id}`,
    BY_MRN: (mrn) => `/api/patients/mrn/${mrn}`,
    STATS: '/api/patients/stats',
  },
  DOCTORS: {
    BASE: '/api/doctors',
    BY_ID: (id) => `/api/doctors/${id}`,
    STATUS: (id) => `/api/doctors/${id}/status`,
    STATS: '/api/doctors/stats',
  },
  APPOINTMENTS: {
    BASE: '/api/appointments',
    TODAY: '/api/appointments/today',
    BY_ID: (id) => `/api/appointments/${id}`,
    STATUS: (id) => `/api/appointments/${id}/status`,
  },
  ADMISSIONS: {
    BASE: '/api/admissions',
    BY_ID: (id) => `/api/admissions/${id}`,
    TRANSFER: (id) => `/api/admissions/${id}/transfer`,
    DISCHARGE: (id) => `/api/admissions/${id}/discharge`,
    STATS: '/api/admissions/stats',
  },
  LABORATORY: {
    BASE: '/api/laboratory',
    URGENT: '/api/laboratory/urgent',
    BY_ID: (id) => `/api/laboratory/${id}`,
    RESULT: (id) => `/api/laboratory/${id}/result`,
  },
  PHARMACY: {
    BASE: '/api/pharmacy',
    ALERTS: '/api/pharmacy/alerts',
    BY_ID: (id) => `/api/pharmacy/${id}`,
    STOCK: (id) => `/api/pharmacy/${id}/stock`,
    DISPENSE: (id) => `/api/pharmacy/${id}/dispense`,
  },
  BILLING: {
    BASE: '/api/billing',
    BY_ID: (id) => `/api/billing/${id}`,
    PAYMENT: (id) => `/api/billing/${id}/payment`,
    SUMMARY: '/api/billing/summary',
  },
  STAFF: {
    BASE: '/api/staff',
    BY_ID: (id) => `/api/staff/${id}`,
  },
  NOTIFICATIONS: {
    BASE: '/api/notifications',
    UNREAD_COUNT: '/api/notifications/unread-count',
    MARK_READ: (id) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/mark-all-read',
  },
};
