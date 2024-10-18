<template>
    <header>
      <nav>
        <ul>
          <!-- Conditionally display Login or Logout based on login status -->
          <li v-if="!isLoggedIn">
            <button @click="goToLogin">Login</button>
          </li>
          <li v-else>
            <button @click="logoutUser">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'; // If you are using Vue Router for navigation
  
  // Receive the login status as a prop from the parent
  const props = defineProps({
    isLoggedIn: Boolean,
  });
  
  // Emit the logout event to the parent
  const emit = defineEmits(['logout']);
  
  // Logout function
  const logoutUser = () => {
    localStorage.removeItem('token'); // Clear the token
  
    // Emit the logout event to notify the parent component
    emit('logout');
  };
  
  // Navigate to login
  const goToLogin = () => {
    router.push({ path: '/' }); // Assuming the login page is at the root
  };
  </script>
  
  <style scoped>
  /* Style your header here */
  header {
    background-color: #f8f9fa;
    padding: 1rem;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
  }
  
  nav ul li {
    margin-left: 20px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  