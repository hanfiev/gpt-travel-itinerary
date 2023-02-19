<template>
  <div class="container">
    <Map class="map"/>
    <div class="loadingScreen" v-if="loadingScreen"><LoadingScreen /></div>
    <Menu v-if="menuView && !loadingScreen" class="menu" />
    <Results v-if="resultsView" class="results" />
  </div>
</template>

<script setup>
import { menuView, resultsView, results, loadingScreen } from '/stores/stores.js'

watch(results, (val) => {
  menuView.value = false
  resultsView.value = true
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');


body{
  min-height: 100dvh;
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #F5F7F9;
}

.container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100dvh;
}

.map{
  width: 100vw;
  max-width: 600px;
  height: 40dvh;
  z-index:0;
}

.menu{
height: 60dvh;
padding: 0px 10px;
}

.loadingScreen {
  height: 60dvh;
  width: 100dvw;
}

.results {
  height: 60dvh;

}

</style>