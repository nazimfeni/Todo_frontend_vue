<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const newTask = ref("");
const tasks = ref([]);

// Fetch tasks from API
const fetchTasks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/tasks");
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Add a new task and update tasks list
const addTask = async () => {
  if (newTask.value.trim() !== "") {
    try {
      const response = await axios.post("http://localhost:8000/api/tasks", {
        task: newTask.value,
      });

      if (response.data && response.data.task) {
        tasks.value = [...tasks.value, response.data.task];
      }

      newTask.value = "";
    } catch (error) {
      console.error("Error adding task:", error);
    }
  } else {
    alert("Please enter a valid task.");
  }

  fetchTasks();
};

// Mark a task as completed or not
const toggleCompletion = async (task) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/tasks/${task.id}/complete`);
    const updatedTask = response.data;

    // Update the local tasks array
    const index = tasks.value.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index].completed = updatedTask.completed; // Update the completion status
    }
  } catch (error) {
    console.error("Error toggling task completion:", error);
  }
};

const removeTask = async (taskId) => {
  try {
    // Send a DELETE request to remove the task
    await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);

    // Remove the task from the local tasks array
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  } catch (error) {
    console.error("Error removing task:", error);
  }
};


onMounted(fetchTasks); // Fetch tasks when component is mounted
</script>
<template>
  <div class="todo-app">
    <h1>To Do List</h1>
    <div class="task-input">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button @click="addTask">Add Task</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>
            <input
              type="checkbox"
              v-model="task.completed"
              @change="toggleCompletion(task)"
            />
            <span :class="{ completed: task.completed }">{{ task.task }}</span>
          </td>
          <td>{{ task.completed ? 'Yes' : 'No' }}</td>
          <td>
            <button @click="removeTask(task.id)" class="remove-button">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: rgb(181, 21, 21);
}

.todo-app {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.task-input {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
  font-size: 14px;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 8px 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-button {
  padding: 6px 10px;
  font-size: 12px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c0392b;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

</style>
