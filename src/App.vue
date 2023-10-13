<script setup>

import { RouterLink, RouterView } from 'vue-router';
import Header from './layouts/Header.vue';
import Header2 from './layouts/Header2.vue';
import Main from './layouts/Main.vue';
import Footer from './layouts/Footer.vue';
import router from "./router";

</script>

<template>
    <div v-if="$route.name !== 'login' && $route.name !== 'register'">
        <div v-if="token !== null">
            <Header2/>
        </div>
        <div v-else>
            <Header/>
        </div>
    </div>

    <RouterView/>

    <div v-if="$route.name !== 'login' && $route.name !== 'register'">
    <Footer />
    </div>
</template>

<script>
    const token = localStorage.getItem('token');
    export default {
        mounted() {
            const valueFromLocalStorage = localStorage.getItem('token'); // Change 'yourKey' to the actual key
            const register_storage = localStorage.getItem('register');
            if (valueFromLocalStorage === null) {
                this.$router.push('/'); // Redirect to login page
            }
        }
    };
</script>

<style scoped></style>
