<template>
  <div id="loader">
    <lottie-player autoplay loop mode="normal" src="https://assets3.lottiefiles.com/packages/lf20_rlmdrwm8.json" style="width: 320px"></lottie-player>
    <div style="height:100%; font-weight: 400; font-size: 16pt;">Generating itinerary...</div>
  </div>
</template>

<script setup>
if (typeof window !== 'undefined') import('@lottiefiles/lottie-player')
</script>

<style scoped>
#loader {
  /* position: absolute;
  top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #F6F7FA;
  backdrop-filter: blur(7px);
  /* background-color: red; */
}
</style>