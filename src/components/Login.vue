<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  const password = ref('');
  
  const emit = defineEmits(['login-success']);
  
  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email.value,
        password: password.value,
      });
  
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
  
      // Emit the login-success event to notify the parent component
      emit('login-success');
  
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert('Login failed. Please check your credentials.');
    }
  };
  </script>
  