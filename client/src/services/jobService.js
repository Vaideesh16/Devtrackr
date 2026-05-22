import api from './api';

export const getJobs = async (params = {}) => {
  const { data } = await api.get('/jobs', { params });
  return data;
};

export const createJob = async (payload) => {
  const { data } = await api.post('/jobs', payload);
  return data;
};

export const updateJob = async (id, payload) => {
  const { data } = await api.put(`/jobs/${id}`, payload);
  return data;
};

export const deleteJob = async (id) => {
  await api.delete(`/jobs/${id}`);
};
