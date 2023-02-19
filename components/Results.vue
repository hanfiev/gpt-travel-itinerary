<template>
  <div class="resultsContainer">
    <div class="header">
      <div class="btn"><span @click="reset()" class="material-symbols-rounded iconbtn">arrow_back</span></div>
      <div class="title">
        <div class="city">{{ selectedCity }}</div>
        <div class="day">{{ selectedDays }} day(s)</div>
      </div>
      <div class="share">
        <!-- <span class="material-symbols-rounded iconbtn">share</span> -->
      </div>
    </div>
    <div class="itinerary">
      <div v-for="(day,i) in results">
        <div class="day">
          <div class="day_num">Day {{ i+1 }}</div>
          <div class="activities">
            <div v-for="(activity, index) in day" :key="index" :class="{ 'active' : selectedActivity.place === activity.place }" @click="selectedActivity = activity" class="activity" :latitude="activity.latitude" :longitude="activity.longitude">
              <div class="hour">{{ activity.time }}</div>
              <div class="place">{{ activity.place }}</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { selectedCity, selectedDays, selectedActivity, results, geojson, menuView, resultsView, resetCounter } from '/stores/stores.js'
import { generateGeojson } from '/composables/geojson.js'

onMounted(() => {
  let data = []
  for (let i = 0; i < results.value.length; i++) {
    data = data.concat(results.value[i]);
  }
  geojson.value = generateGeojson(data)
})

const reset = () => {
  selectedCity.value = []
  selectedDays.value = null
  menuView.value = true
  resultsView.value = false
  resetCounter.value ++

}

</script>

<style scoped>
.material-symbols-rounded{
  font-weight: 700;
}
.resultsContainer{
  width:100%;
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  background-color: #fff;
  padding: 10px 15px;
  margin: 10px;
  align-items: center;
  box-sizing:content-box;
  border-radius: 7px;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.03), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0215656), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0178832), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.015), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0121168), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.00843437);
}

.itinerary {
  /* background-color: #F5F7F9; */
  padding: 10px;
  max-height: calc(60dvh - 102px);
  overflow: auto;
}

.day_num {
  margin: 10px 0px;
  font-weight: 600;
}

.activity {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
}

.activity:hover {
  background-color: #d6d8e7;
  border-radius: 5px;
  cursor: pointer;
}
.activity.active {
  background-color: #0B20D0;
  border-radius: 5px;
  padding: 10px;
}

.activity.active > .hour {
  background-color: #051493;
  color: #fff;
}

.activity.active > .place {
  color: #fff;
}



.hour {
  background-color: #E9EAF3;
  font-size: 11pt;
  color: #0D197C;
  font-weight: 600;
  padding: 12px;
  border-radius: 5px;
  min-width: 50px;
  text-align: center;
}

.place {
  color: #0D197C;
}

.title {
  width: 100%;
}

.city {
  font-weight: 600;
  font-size: 14pt;
  color: #0D197C;
}

.day {
  color: #8A8B93
}

.btn {
  cursor: pointer;
}
</style>