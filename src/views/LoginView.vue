<script setup lang="ts">
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores/auth-store';

import { useRouter } from "vue-router";
const router = useRouter();
const schema = Yup.object().shape({
  username: Yup.string().required('Le pseudo est requis'),
  password: Yup.string().required('Le mot de passe est requis')
});
const authStore = useAuthStore();
 function onSubmit(values: any, { setErrors }: any) {
   
    const { username, password } = values;

    try {
      
  authStore.login(username, password);
  router.push({ name: "home" });

} catch (error) {
return setErrors({ apiError: error });
}
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
          <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
      </Form>
  </div>
</template>