import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const staffService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STAFF.BASE, { params });
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.STAFF.BASE, data);
    return response.data;
  },
};
