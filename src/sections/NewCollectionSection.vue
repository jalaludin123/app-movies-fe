<script setup>
import drama_movies from "../data/DramaMovies";
import getMovies from "../data/getMovies";
import axios from 'axios';
import InfiniteScrollSection from "../sections/InfiniteScrollSection.vue";
</script>

<template>
    <!-- Collection Section Start -->
    <main class="bg-black">
        <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div>
                    <h2 class="text-3xl md:text-4xl font-theme-heading font-medium text-center mb-12 text-white">All New Realeases</h2>
                </div>
                <Suspense>
                    <InfiniteScrollSection />
                    <template #fallback>
                        <p class="text-white">Loading...</p>
                    </template>
                </Suspense>
            </div>
        </div>
        <hr>
    </main>
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
            getMovies(skip,limit){
                axios.get("http://127.0.0.1:8000/api/movies/skip/limit").then(res => {
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
