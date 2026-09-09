import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const patientService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.PATIENTS.BASE, { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.PATIENTS.BY_ID(id));
    return response.data;
  },

  getByMrn: async (mrn) => {
    const response = await apiClient.get(ENDPOINTS.PATIENTS.BY_MRN(mrn));
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.PATIENTS.BASE, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(ENDPOINTS.PATIENTS.BY_ID(id), data);
    return response.data;
  },

  delete: async (id) => {
    await apiClient.delete(ENDPOINTS.PATIENTS.BY_ID(id));
  },

  getStats: async () => {
    const response = await apiClient.get(ENDPOINTS.PATIENTS.STATS);
    return response.data;
  },
};
