<template>
  <div class="menuContainer">
    <div class="header">
      <h1>Where do you want to go?</h1>
    </div>
    <div class="selector">
      <div class="city">
        <Multiselect v-model="selectedCity" :options="options" mode="single" openDirection="top" placeholder="Select a city" :create-option="true" :searchable="searchable" :max="max" class="multiselect-blue" />
      </div>
      <div class="days"> <Multiselect v-model="selectedDays" :options="daysOptions" mode="single" openDirection="top" placeholder="Select duration" class="multiselect-blue" /></div>
      <div @click="query()" class="search">Generate Itinerary</div>
    </div> 
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import cities from '/assets/cities.json';
import { selectedCity, selectedDays, results, loadingScreen } from '/stores/stores.js'

const options = cities
const daysOptions = [
    { value: 1, label: '1 day' },
    { value: 2, label: '2 days' },
    { value: 3, label: '3 days' },
  ]
const max = 1
const searchable = true
const query = async() => {

  loadingScreen.value = true
  let city = encodeURIComponent(selectedCity.value.trim())
  let days = selectedDays.value
  let uri = 'https://fg6vyldqnbmesjwdm67hofd2uq0xpvlt.lambda-url.ap-northeast-1.on.aws/itinerary'
  let apiquery = uri + '?city=' + city + '&duration=' + days
  
  await fetch(apiquery)
        .then(response => response.json())
        .then(data => {
          results.value = data
        })
        .catch(error => {
          console.log(error)
        })
  loadingScreen.value = false
}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.header{
  padding: 10px;
  height: 100%;
}
h1 {
  font-size: 30pt;
}
.menuContainer{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.selector{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;  
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.03), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0215656), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0178832), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.015), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0121168), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.00843437);
  padding: 10px;
  margin: 20px 0;
  box-sizing: border-box;
}
  .city{
    font-size: 16px;
    font-weight: 500;
    color: #000;
    width: 100%;
  }
  .days{
    font-size: 16px;
    font-weight: 500;
    color: #000;
    width: 100%;
  }
  .search{
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    min-width: 36px;
    min-height: 36px;
    font-weight: 500;
    color: #ffffff;
    background-color: blue;
    padding: 2px;
    border-radius: 7px;
    cursor: pointer;
  }

  .multiselect {
    border: 0 !important;
  }
  .multiselect-blue {
  --ms-bg: #eaf0f7;
  --ms-option-bg-selected: #2563EB;
}

</style>