import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const billingService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.BILLING.BASE, { params });
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post(ENDPOINTS.BILLING.BASE, data);
    return response.data;
  },

  recordPayment: async (id, amountPaid, paymentMethod = 'Credit Card') => {
    const response = await apiClient.post(ENDPOINTS.BILLING.PAYMENT(id), null, {
      params: { amountPaid, paymentMethod },
    });
    return response.data;
  },

  getSummary: async () => {
    const response = await apiClient.get(ENDPOINTS.BILLING.SUMMARY);
    return response.data;
  },
};
