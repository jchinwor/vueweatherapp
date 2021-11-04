<template>
  <div class="flex justify-center mt-7 mb-5">
       <div >
      <form v-on:submit.prevent=''>
      <input type="text" v-model="searchQuery"
       class="sm:text-sm focus:border-black focus:ring-black rounded-full w-full px-7 "
        placeholder="Search e.g Accra or Lagos" @keypress="searchCity" >   
        </form>  
       </div>        
  </div>

    
  <div v-if="loading" >
          <Spinner />
    </div>
    <div v-if="errormodal">
        <ErrorModal />
        
    </div>
    
    <div v-if="fetchdata">        
    <div class="flex justify-center mt-4" >
        <div id="appb" :class="typeof detail.main !='undefined'  && detail.weather[0].icon.includes('n') ? 'night' : ''" class="w-full md:w-64 justify-center items-center  shadow-lg rounded-lg flex flex-col bg-white bg-opacity-25" >
            <div id="whoobe-1okdg" class="w-full p-1 justify-start flex flex-col text-center text-white">
                <h4 class="border-b-2 p-3">{{cityName}}</h4>
                <h4 class="p-2">{{country}}</h4>
            <button value="button" class="  text-white hover:bg-purple-700 bg-purple-500 rounded-full" id="whoobe-jkkr2">{{dateBuilder()}}</button>

                <p class="mt-1 text-3xl object-contain overflow-hidden" >{{temperature}}&deg;C</p>
                <p>{{description}}</p>
                <div class="flex justify-center space-x-10">
                    <h3>{{lowTemp}}&deg;C</h3>
                    <h3>{{highTemp}}&deg;C</h3>
                </div>
                <div class=" flex justify-center text-center  items-center " >
              <img :src="url" class="" alt="">  
            </div>
      
                <div class="flex justify-between text-3xl p-2">
                    <div>
                        <h3 >{{feelsLike}}&deg;C</h3>
                        <p class="text-sm">Feels Like</p>
                    </div>
                    <div>
                        <h3>{{humidity}}&deg;%</h3>
                        <p class="text-sm">Humidity</p>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
    </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import Spinner from "../components/Spinner.vue"
import ErrorModal from "../components/ErrorModal.vue"
export default {
    components:{Spinner,ErrorModal},
    setup(){
        const  api_key = ref('57f530c344ce0f8d45e91db6f8e825c3')
        const  cityName = ref(null)
        const  fetchdata = ref(false)
        const  errormodal = ref(false)
        const  searchQuery = ref('')
        const  country = ref(null)
        const  temperature = ref(null)
        const  description = ref(null)
        const  lowTemp = ref(null)
        const  highTemp = ref(null)
        const  feelsLike = ref(null)
        const  humidity = ref(null)
        const  loading = ref(false)
        const  detail = ref({})
        const  url = ref('')
        const  isDay = ref(true)
        const  timeOfDay = ref(null)
        const  base_url = ref("https://api.openweathermap.org/data/2.5/")
    
            const searchCity = (e) =>{
                if ( e.key == "Enter") {
                    loading.value  = true;

                    if(searchQuery.value === 'lagos' || searchQuery.value ==='LAGOS' || searchQuery.value ==='ACCRA' || 
                    searchQuery.value === 'Accra' || searchQuery.value === 'Lagos' || searchQuery.value === 'accra'){
                         errormodal.value = false 
                        setTimeout( () => { loading.value = false } , 1000);
                        setTimeout(() =>  { fetch( `${base_url.value}weather?q=${searchQuery.value}&units=metric&appid=${api_key.value}`)
                        .then(response => response.json())
                        .then(results) 
                        } , 90);      
                    }
                    else if(searchQuery.value === ''){
                        loading.value  = true;
                         setTimeout( () => { loading.value = false } , 1000);
                    }
                    else{
                    loading.value  = true;
                    setTimeout( () => { loading.value = false } , 1000);
                    setTimeout(() =>  { errormodal.value = true  } , 1000);  
                    
                }    

                }
                
                    
            }

            const dateBuilder = (e) => {
                let d = new Date();
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

                let day = days[d.getDate()];
                let date = d.getDate();
                let month = months[d.getMonth()];
                let year = d.getFullYear();

                return `${day} ${date} ${month} ${year}`;
            }
          
          const results = (result) =>{
           fetchdata.value = true
           errormodal.value = false 

            
           detail.value =  result
           cityName.value =  detail.value.name
           country.value =  detail.value.sys.country
           temperature.value =  Math.round(detail.value.main.temp)
           description.value =  detail.value.weather[0].description
           lowTemp.value =  Math.round(detail.value.main.temp_min)
           highTemp.value =  Math.round(detail.value.main.temp_max)
           feelsLike.value =  Math.round(detail.value.main.feels_like)
           humidity.value =  Math.round(detail.value.main.humidity)
           timeOfDay.value =  detail.value.weather[0].icon;
           url.value = `http://openweathermap.org/img/wn/${detail.value.weather[0].icon}@2x.png`
         
       
       }


        return{
            api_key,
            isDay,
            fetchdata,
            errormodal,
            cityName,
            country,
            temperature,
            description,
            lowTemp,
            highTemp,
            feelsLike,
            humidity,
            searchCity,
            loading,
            searchQuery,
            base_url,
            results,
            detail,
            url,
            timeOfDay,
            dateBuilder
        }
    }
}
</script>

<style>
#appb{
    /* background-image: url('../assets/warmweather.jpg');
    background-size: cover;
    transition:0.4s */


 min-height:100%;
  background:linear-gradient(0deg, rgba(214, 108, 197, 0.637), rgba(63, 61, 61, 0.5)), url(../assets/warmweather.jpg);
  background-size:cover;
}
#appb.night{
 min-height:100%;
  background:linear-gradient(0deg, rgba(214, 108, 197, 0.637), rgba(63, 61, 61, 0.5)), url(../assets/night.jpg);
  background-size:cover;
}
</style>