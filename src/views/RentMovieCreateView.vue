<script setup>
  
</script>

<template>
<div class="container mx-auto px-5 py-12 md:w-4/5">
  <form @submit.prevent="CreateRentMovie" class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-6 sm:pt-10 sm:space-y-5">
            <div>
                <h2 class="text-3xl md:text-4xl font-theme-heading font-medium text-center mb-3">Form Rental Movie</h2>
            </div>
            <div class="space-y-6 sm:space-y-5">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Title Movie </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" readonly v-model="movie.name" name="first-name" id="first-name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Price Movie </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" readonly v-model="movie.price" name="first-name" id="first-name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="last-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Nominal </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" v-model="movie.nominal" name="last-name" id="last-name" autocomplete="family-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="country" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Metode Pembayaran </label>
                    <div class="mt-1">
                        <select id="country" name="country" v-model="movie.metode_pembayaran" autocomplete="country-name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 max-w-lg block w-full sm:text-sm border-gray-300 rounded-md">
                            <option value="CASH">CASH</option>
                            <option value="MANDIRI">MANDIRI</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <RouterLink to="/" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</RouterLink>
        <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Next</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
    import axios from 'axios';
    import { RouterLink } from 'vue-router';

    export default {
       name: 'create-movie',
       data () {
         return {
           result: {},
           movie:{
                name: '',
                price: '',
                nominal: '',
                metode_pembayaran: ''
           },
           transaction : []
         }
        },
        created() { 
        },
        mounted() {
             //console.log(this.$route.params.id);
             this.getMovies();
        },
        methods: {
            getMovies(){
                axios.get("http://127.0.0.1:8000/api/movies/"+this.$route.params.id).then(res => {
                    this.movies = res.data
                    //console.log(this.movies)
                    this.movie.name = res.data.name;
                    this.movie.price = res.data.harga;
                })
            },

            CreateRentMovie()
            {
                const data_trx = {
                    'id_movie' : this.$route.params.id,
                    'id_user' : localStorage.getItem('user_id'),
                    'metode_pembayaran' : this.movie.metode_pembayaran,
                    'nominal' : this.movie.nominal,
                    'status' : 'for rent'
                };

                this.transaction = data_trx
                // Use Axios to send create movie request
                axios.post('http://127.0.0.1:8000/api/rental', this.transaction)
                .then(response => {
                    alert("Add Rental Movie Successfully, you can enjoyed the movie!!!");
                    window.location.href = "http://localhost:5173/app-movies/my-list-rental";
                })
                .catch(error => {
                    alert(error);
                    console.error(error);
                });
            }
        }
    }
</script>
