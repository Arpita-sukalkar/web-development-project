import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const doctorService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.DOCTORS.BASE, { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.DOCTORS.BY_ID(id));
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.DOCTORS.BASE, data);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await apiClient.patch(ENDPOINTS.DOCTORS.STATUS(id), null, {
      params: { status },
    });
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get(ENDPOINTS.DOCTORS.STATS);
    return response.data;
  },
};
