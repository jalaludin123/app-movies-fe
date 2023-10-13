<script setup>
import faqs from "../data/faqs.js";
import { ref } from "vue";

let isOpen = ref(1);
</script>

<template>
    <!-- Questions Section Start -->
    <div id="faq" class="mx-auto px-5 bg-black">
        <section class="py-16 pt-18">
            <div class="w-4/5 md:w-3/5 mx-auto">
                <h2 class="text-3xl md:text-4xl font-theme-heading font-medium text-center text-white">Frequently Asked Questions</h2>
            </div>

            <div class="mt-10 w-full lg:w-3/4 mx-auto ">
                <ul class="shadow-lg text-white">
                    <template v-for="(faq, index) in faqs" :key="faq.id">
                        <li @click="isOpen = faq.id" :class="isOpen === faq.id ? 'text-white' : ''" class="font-theme-content font-medium text-xl cursor-pointer hover:text-white py-5 flex justify-between items-center transition duration-200 bg-[#303030] px-6">
                            <a href="#">{{ faq.title }}</a>
                            <svg :class="isOpen === faq.id ? 'rotate-180 text-white' : 'rotate-0 text-white'" class="transform" xmlns="http://www.w3.org/2000/svg" width="18" height="12"><path fill="none" stroke="currentColor" stroke-width="3" d="M1 1l8 8 8-8" /></svg>
                        </li>
                        <p v-show="isOpen === faq.id" class="bg-[#303030] px-6 font-theme-content text-md lg:text-lg py-5 text-white text-justify">{{ faq.description }}</p>
                    </template>
                </ul>
            </div>
        </section>
    </div>
    <hr />
    <!-- Questions Section End -->
</template>
