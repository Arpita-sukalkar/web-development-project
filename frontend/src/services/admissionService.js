import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const admissionService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ADMISSIONS.BASE, { params });
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.ADMISSIONS.BASE, data);
    return response.data;
  },

  transferBed: async (id, newWard, newBedNumber) => {
    const response = await apiClient.post(ENDPOINTS.ADMISSIONS.TRANSFER(id), null, {
      params: { newWard, newBedNumber },
    });
    return response.data;
  },

  discharge: async (id) => {
    const response = await apiClient.post(ENDPOINTS.ADMISSIONS.DISCHARGE(id));
    return response.data;
  },

  getWardStats: async () => {
    const response = await apiClient.get(ENDPOINTS.ADMISSIONS.STATS);
    return response.data;
  },
};
