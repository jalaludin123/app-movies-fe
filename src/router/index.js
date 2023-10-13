import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import CustomerView from '../views/CustomerView.vue'
import RegisterView from '../views/RegisterView.vue'
import CreateMovieView from '../views/CreateMovieView.vue'
import UpdateMovieView from '../views/UpdateMovieView.vue'
import RentMovieCreateView from '../views/RentMovieCreateView.vue'
import MyListRentalView from '../views/MyListRentalView.vue'
import AllNewMoviesView from '../views/AllNewMoviesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/create-movie',
      name: 'create-movie',
      component: CreateMovieView
    },
    {
      path: '/edit-movie/:id',
      name: 'edit-movie',
      component: UpdateMovieView
    },
    {
      path: '/rent-movie/:id',
      name: 'rent-movie',
      component: RentMovieCreateView
    },
    {
      path: '/my-list-rental',
      name: 'my-list-rental',
      component: MyListRentalView
    },
    {
      path: '/all-new-movies',
      name: 'all-new-movies',
      component: AllNewMoviesView
    },
  ]
})

export default router
