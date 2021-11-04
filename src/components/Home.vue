<template>
<div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <div class="container bg-gray-50 h-screen">
    <div>
            <div class="flex justify-center ">
                <h2 class=" mt-7 text-white bg-purple-600 object-contain rounded-full p-4">Vue Weather App</h2>          
            </div>
            <h3 class="mt-2 text-center">Check the weather of Lagos or Accra City</h3>
    <main>
        <Weather />
    </main>
    </div>

</div>
</div>


 
</template>

<script>
import Weather from '../components/Weather.vue'

export default {
    components:{Weather}
}
</script>

<style>

</style>