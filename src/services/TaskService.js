// src/services/TaskService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, { task });
    return response.data.task;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const toggleCompletion = async (taskId) => {
  try {
    const response = await axios.post(`${API_URL}/${taskId}/complete`);
    return response.data;
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};

export const removeTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    console.error("Error removing task:", error);
    throw error;
  }
};
