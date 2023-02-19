<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map{
   width:100%;
   height:100%;
   z-index: -1;
}
</style>

<script setup>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { results, geojson, selectedCity, selectedActivity, resetCounter } from '/stores/stores.js'

let geojson_object = {type: 'FeatureCollection',features: []}


const apiKey = useRuntimeConfig().public.apiKey

let map
let popup

const drawActivities = () => {
  
  map.getSource('activities').setData(geojson.value)

  zoomToBound()
  
}

const zoomToBound = () => {
  let bounds = new mapboxgl.LngLatBounds();
  geojson.value.features.forEach(function(feature) {
    bounds.extend(feature.geometry.coordinates);
  });
  map.fitBounds(bounds, { padding: 20 });
}

const resetZoom = () => {
  map.flyTo({
    center: [-73.9965,40.7295],
    zoom: 0.5
  });
}

watch (resetCounter, () => {
  resetZoom()
  map.getSource('activities').setData(geojson_object)
  popup.remove()
})


const zoomToSelected = () => {
  let latitude = selectedActivity.value.latitude
  let longitude = selectedActivity.value.longitude
  map.flyTo({
    center: [longitude, latitude],
    zoom: 15
  });
  popup.setLngLat([longitude, latitude])
  .setHTML(`<h3>${selectedActivity.value.place}</h3>\
  <a href="http://maps.google.com/maps?q=${selectedActivity.value.place}, ${selectedCity.value}">Direction</p>`)

  .addTo(map)
}

watch(selectedActivity, () => {
    zoomToSelected()
})

watch(geojson, () => {

    drawActivities()
  
  
})

onMounted(() => {
  
  mapboxgl.accessToken = apiKey;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hanfiev-dev/cle5pgx79001j01nsz7736npu',
    center: [-73.9965,40.7295],
    zoom: 0.5
  });


    map.on('load',()=>{
      popup = new mapboxgl.Popup({
      closeButton: false
      });

      map.addSource(`activities`, {
      type: 'geojson',
      data: geojson_object
    });
    map.addLayer({
      id: `activities`,
      type: 'circle',
      source: `activities`,
      paint: {
        'circle-color': '#0B20D0',
        'circle-opacity': 0.9
      }
    });
      // drawActivities();
      // zoomToBound()
    })

    // At low zooms, complete a revolution every 30s.
    const secondsPerRevolution = 30;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                // Slow spinning at higher zooms
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            // Smoothly animate the map over one second.
            // When this animation is complete, it calls a 'moveend' event.
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    }

    // Pause spinning on interaction
    map.on('mousedown', () => {
        userInteracting = true;
    });

    // Restart spinning the globe when interaction is complete
    map.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
    });

    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.
    map.on('dragend', () => {
        userInteracting = false;
        spinGlobe();
    });
    map.on('pitchend', () => {
        userInteracting = false;
        spinGlobe();
    });
    map.on('rotateend', () => {
        userInteracting = false;
        spinGlobe();
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
        spinGlobe();
    });

    spinGlobe();
    
})

</script>

