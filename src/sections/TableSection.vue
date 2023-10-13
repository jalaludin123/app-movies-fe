<script setup>
  import { RouterLink } from 'vue-router';
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="container mx-auto px-5 py-12">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Movies</h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <RouterLink to="/create-movie" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add Movie</RouterLink>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300" id="myTable">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(movies, index) in this.movies" :key="movies.id" :class="index % 2 === 0 ? undefined : 'bg-gray-50'">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ movies.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ movies.description }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ movies.harga }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                    <RouterLink :to="{ path : '/edit-movie/'+movies.id}" class="text-indigo-600 hover:text-indigo-900"
                      >Edit<span class="sr-only">, {{ movies.id }}</span></RouterLink
                    > |
                    <a href="#" @click="deleteMovie(movies.id)" class="text-indigo-600 hover:text-indigo-900"
                      >Hapus<span class="sr-only">, {{ movies.id }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import "datatables.net-dt/css/jquery.dataTables.css"; // Import DataTables CSS
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTables
export default {
    name: 'movies',
    data(){
        return {
            movies : []
        }
    },
    mounted(){
        this.getMovies();
    },
    methods : {
        getMovies(){
            axios.get("http://127.0.0.1:8000/api/movies").then(res => {
                this.movies = res.data
                this.$nextTick(() => {
                  this.initDataTable();
                });
                //console.log(this.movies)
            })
        },
        initDataTable() {
          $(this.$el)
            .find('#myTable')
            .DataTable({
              info:false,
              lengthChange: false,
              searching: false,
              // DataTables configuration options
            });
        },
        deleteMovie(id){
            if(confirm('Are you sure, you want to delete this data?')){
                axios.delete('http://127.0.0.1:8000/api/movies/'+id)
                .then(res => {
                    //console.log(id)
                    alert('Movie deleted succesfully');
                    // Destroy and reinitialize the DataTable
                    const table = $(this.$el.querySelector('#myTable'));
                    table.DataTable().destroy();
                    this.initDataTable();
                })
                .catch(function (error) {
                    if(error.response.status == 404){
                        alert(error.response.message);
                    }
                });
            }
        }
    }
}
</script>