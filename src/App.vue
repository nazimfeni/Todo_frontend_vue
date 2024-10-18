<script setup>
import { ref, onMounted } from "vue";
import TodoList from "./components/TodoList.vue";
import Login from "./components/Login.vue";
import Header from "./components/Header.vue"; // Import the header component
import { useRouter } from "vue-router"; // For navigation

// Track the login status
const isLoggedIn = ref(false);
const router = useRouter(); // Router instance

// Check for token in localStorage on page load
onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;
  }
});

// Handle login success
const handleLoginSuccess = () => {
  isLoggedIn.value = true;
};

// Handle logout
const handleLogout = () => {
  isLoggedIn.value = false; // Update the login state to false
  router.push("/"); // Redirect to the login page
};
</script>

<template>
  <div>
    <!-- Pass the isLoggedIn state to the Header component and listen for logout event -->
    <Header :isLoggedIn="isLoggedIn" @logout="handleLogout" />

    <!-- Conditionally show the Login or TodoList component -->
    <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <TodoList v-if="isLoggedIn" />
  </div>
</template>
