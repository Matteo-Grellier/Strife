<script setup lang="ts">
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores/auth-store';
const schema = Yup.object().shape({
  username: Yup.string().required('The username is required'),
  password: Yup.string().required('The password is required')
});
const authStore = useAuthStore();
  function onSubmit(values: any) {
    const { username, password } = values;
    return authStore.login(username, password)
}
</script>
<template>
  <div>
     
      <h2>Login</h2>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
          <div class="form-group">
              <label>Username</label>
              <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
              <div class="invalid-feedback">{{errors.username}}</div>
          </div>            
          <div class="form-group">
              <label>Password</label>
              <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
              <div class="invalid-feedback">{{errors.password}}</div>
          </div>            
          <div class="form-group">
              <button class="btn btn-primary" :disabled="isSubmitting">
                  <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                  Login
              </button>
          </div>
         
      </Form>
  </div>
</template>