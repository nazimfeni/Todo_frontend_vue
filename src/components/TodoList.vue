<script setup>
import { ref, onMounted } from "vue";
import { fetchTasks, addTask, toggleCompletion, removeTask } from "@/services/TaskService";

const newTask = ref("");
const tasks = ref([]);

// Fetch tasks from API
const loadTasks = async () => {
  try {
    tasks.value = await fetchTasks();
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Add a new task
const handleAddTask = async () => {
  if (newTask.value.trim() !== "") {
    try {
      const task = await addTask(newTask.value);
      tasks.value.push(task);
      newTask.value = ""; // Clear input field
    } catch (error) {
      console.error("Error adding task:", error);
    }
  } else {
    alert("Please enter a valid task.");
  }
};

// Mark a task as completed or not
const handleToggleCompletion = async (task) => {
  try {
    const updatedTask = await toggleCompletion(task.id);
    const index = tasks.value.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index].completed = updatedTask.completed;
    }
  } catch (error) {
    console.error("Error toggling task completion:", error);
  }
};

// Remove a task
const handleRemoveTask = async (taskId) => {
  try {
    await removeTask(taskId);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (error) {
    console.error("Error removing task:", error);
  }
};

onMounted(loadTasks); // Fetch tasks when component is mounted
</script>

<template>
  <div class="todo-app">
    <h1>To Do List</h1>
    <div class="task-input">
      <input
        v-model="newTask"
        @keyup.enter="handleAddTask"
        placeholder="Add a new task"
      />
      <button @click="handleAddTask">Add Task</button>
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
              @change="handleToggleCompletion(task)"
            />
            <span :class="{ completed: task.completed }">{{ task.task }}</span>
          </td>
          <td>{{ task.completed ? 'Yes' : 'No' }}</td>
          <td>
            <button @click="handleRemoveTask(task.id)" class="remove-button">Remove</button>
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
</style>
