import api from './api';

export const getAnalytics = async () => {
  const { data } = await api.get('/analytics');
  return data;
};

export const getReminders = async (days = 7) => {
  const { data } = await api.get('/reminders', { params: { days } });
  return data;
};
