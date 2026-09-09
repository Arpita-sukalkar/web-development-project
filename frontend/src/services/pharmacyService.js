import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const pharmacyService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.PHARMACY.BASE, { params });
    return response.data;
  },

  getAlerts: async () => {
    const response = await apiClient.get(ENDPOINTS.PHARMACY.ALERTS);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.PHARMACY.BASE, data);
    return response.data;
  },

  updateStock: async (id, newQuantity) => {
    const response = await apiClient.patch(ENDPOINTS.PHARMACY.STOCK(id), null, {
      params: { newQuantity },
    });
    return response.data;
  },

  dispense: async (id, quantity) => {
    const response = await apiClient.post(ENDPOINTS.PHARMACY.DISPENSE(id), null, {
      params: { quantity },
    });
    return response.data;
  },
};
