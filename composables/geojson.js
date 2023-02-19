export const generateGeojson = (data) => {
  return {
    type: 'FeatureCollection',
    features: data.map((item) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.longitude, item.latitude],
        },
        properties: {
          name: item.place,
          time: item.time,
          mapsURL: `http://maps.google.com/maps?q=${item.latitude},${item.longitude}`
        },
      }
    }),
  }
}