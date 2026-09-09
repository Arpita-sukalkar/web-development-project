import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const dashboardService = {
  getSummary: async () => {
    const response = await apiClient.get(ENDPOINTS.DASHBOARD.SUMMARY);
    return response.data;
  },
};
