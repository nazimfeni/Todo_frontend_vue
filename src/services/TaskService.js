// src/services/TaskService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, { task });
  return response.data.task;
};

export const toggleCompletion = async (taskId) => {
  const response = await axios.post(`${API_URL}/${taskId}/complete`);
  return response.data;
};

export const removeTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};
