<script setup>
import { inject } from 'vue';
import { createUserApi, loginUserApi } from '@/api/userApi';
import {handleLogin,handleCreate} from '../models/usermodel'



const LoginState = inject('LoginState');

</script>

<template>
  <div>
    <div>
      <label>
        Email:
        <input type="email" v-model="LoginState.email" />
      </label>
    </div>
    <div>
      <label>
        Password:
        <input type="password" v-model="LoginState.password" />
      </label>
    </div>
    <button type="button" @click="handleLogin">Login</button>
    <button type="button" @click="handleCreate">Create User</button>
    <p v-if="LoginState.loginError">{{ LoginState.loginError }}</p>
  </div>
</template>
