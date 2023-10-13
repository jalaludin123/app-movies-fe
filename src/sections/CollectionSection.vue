<script setup>
import drama_movies from "../data/DramaMovies";
import axios from 'axios';
import InfiniteScrollSection from "../sections/InfiniteScrollSection.vue";
</script>

<template>
    <!-- Collection Section Start -->
    <main class="bg-black">
        <div class="mx-auto max-w-7xl">
            <div class="lg:grid lg:grid-cols-12 lg:gap-8">
                <div class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                    <div>
                        <h1 class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                        <span class="md:block">Movies</span>
                        {{ ' ' }}
                        </h1>
                        <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</p>
                    </div>
                </div>
            </div>
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div class="flex items-center justify-between space-x-4 mt-12">
                    <h2 class="text-lg font-medium text-white">New Realeases</h2>
                    <RouterLink to="/all-new-movies" class="whitespace-nowrap text-sm font-medium text-white hover:text-indigo-500">View all<span aria-hidden="true"> &rarr;</span></RouterLink>
                </div>
                <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4" ref="listEl">
                    <div v-for="(movies, index) in movies" :key="movies.id" class="relative group items-center text-center">
                        <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-800">
                            <div v-if="movies.file !== null">
                                <img :src="movies.file" alt="Browser Logo" class="object-center object-cover"/>
                            </div>
                            <div v-else>
                                <img src="/images/noimage.jpg" alt="Logo" class="object-center object-cover"/>
                            </div>
                        </div>
                        <div class="mt-6">
                            <h3 class="mt-1 font-semibold text-white">
                                {{ movies.name }}
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-4 mt-12">
                    <h2 class="text-lg font-medium text-white">Drama Movies</h2>
                </div>
                <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    <div v-for="(drama_movies, index) in drama_movies" :key="drama_movies.id" class="relative group items-center text-center">
                        <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-800">
                            <img :src="drama_movies.icon" alt="Browser Logo" class="object-center object-cover"/>
                        </div>
                        <div class="mt-6">
                            <h3 class="mt-1 font-semibold text-white">
                                {{ drama_movies.title }}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </div>
    </main>

    <!-- Modal Start -->
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex">
                        <div class="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                            <div v-if="movie_detail.file !== null || movie_detail.file !== null" class="h-40 w-full sm:w-40 border border-gray-300 bg-white text-gray-300" preserveAspectRatio="none" stroke="currentColor" fill="none" viewBox="0 0 200 200" aria-hidden="true">
                                <img :src="movie_detail.file" alt="Browser Logo" />
                            </div>
                            <div v-else class="h-32 w-full sm:w-32 border border-gray-300 bg-white text-gray-300" preserveAspectRatio="none" stroke="currentColor" fill="none" viewBox="0 0 200 200" aria-hidden="true">
                                <img src="/images/noimage.jpg" alt="Logo" />
                            </div>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">{{ movie_detail.name }}</DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">{{ movie_detail.description }}</p>
                            </div>
                            <div class="mt-2">
                                <p class="text-sm text-blue-500">Rp. {{ movie_detail.harga }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="RentMovie(movie_detail.id)">Rent Movie</button>
                    <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="open = false" ref="cancelButtonRef">Cancel</button>
                </div>
            </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
    <!-- Modal End -->
</template>

<script>
    import { ref } from 'vue'
    import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    const open = ref(false)
    export default {
        name: 'movies',
        components: {
            Dialog,
            DialogOverlay,
            DialogTitle,
            TransitionChild,
            TransitionRoot,
        },
        data(){
            return {
                movies : [],
                open : '',
                movie_detail : []
            }
        },
        mounted(){
            this.getMovies();
        },
        methods : {
            getMovies(){
                axios.get("http://127.0.0.1:8000/api/movies/0/4").then(res => {
                    this.movies = res.data
                })
            },
            getMoviesById(id){
                axios.get("http://127.0.0.1:8000/api/movies/"+id).then(res => {
                    this.movie_detail = res.data
                })
            },
            RentMovie(id_movie){
                const user_id = localStorage.getItem('user_id');
                if(user_id === null){
                    alert('Anda harus login terlebih dahulu');
                    this.$router.push('/login'); // Redirect to login page
                }else{
                    //alert('Anda sudah login');
                    this.$router.push('/rent-movie/'+id_movie);
                }
            }
        }
    }
</script>
