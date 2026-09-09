import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const appointmentService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.APPOINTMENTS.BASE, { params });
    return response.data;
  },

  getToday: async () => {
    const response = await apiClient.get(ENDPOINTS.APPOINTMENTS.TODAY);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.APPOINTMENTS.BASE, data);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await apiClient.patch(ENDPOINTS.APPOINTMENTS.STATUS(id), null, {
      params: { status },
    });
    return response.data;
  },
};
