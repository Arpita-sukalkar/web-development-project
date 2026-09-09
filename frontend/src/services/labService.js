import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const labService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.LABORATORY.BASE, { params });
    return response.data;
  },

  getUrgent: async () => {
    const response = await apiClient.get(ENDPOINTS.LABORATORY.URGENT);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.LABORATORY.BASE, data);
    return response.data;
  },

  updateResult: async (id, resultSummary, status = 'COMPLETED') => {
    const response = await apiClient.patch(ENDPOINTS.LABORATORY.RESULT(id), null, {
      params: { resultSummary, status },
    });
    return response.data;
  },
};
