import apiClient from './apiClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const notificationService = {
  getAll: async (unreadOnly = false) => {
    const response = await apiClient.get(ENDPOINTS.NOTIFICATIONS.BASE, {
      params: { unreadOnly },
    });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await apiClient.get(ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT);
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await apiClient.patch(ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
    return response.data;
  },

  markAllAsRead: async () => {
    await apiClient.post(ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },
};
