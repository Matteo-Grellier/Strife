<script setup lang="ts">
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
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
    <div class="loginFormContainer">

        <div>
            <p class="welcomeTitle">
            <h1>Welcome to</h1>
            </p>
            <img src="/logo-text.png" alt="logo-text" class="logo">
        </div>
        <div class="loginForm">
            <div class="userIconContainer">
                <img src="/userIcon.svg" alt="userIcon" style="width: 200px;">
            </div>
            <Form class="formInputs" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <h2 style="margin-bottom: -25px;">Username :</h2>
                    <Field label="Username" name="username" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <h2 style="margin-bottom: -25px;">Password :</h2>
                <div class="form-group">
                    <Field name="password" type="text" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                        <p>Login</p>
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
.welcomeTitle {
    justify-content: center;
    display: flex;
    margin: 0px;
}

.logo {
    width: 500px;
}

.loginFormContainer {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.loginForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #1F2630;
    padding: 60px 100px 60px 100px;
    border-radius: 30px;
}

.userIconContainer {
    display: flex;
    justify-content: center;
    width: 100%;
}

.form-group input {
    margin-top: 30px;
}

.form-group {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 300px;
}

.form-group button {
    margin-top: 30px;
    width: 100%;
}

.form-group p {
    display: flex;
    justify-content: center;
    width: 100%;
}

.formInputs {
    display: flex;
    flex-direction: column;
}

.invalid-feedback {
    width: auto;
    display: flex;
    justify-content: center;
}
</style>