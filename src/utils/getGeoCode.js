const axios = require("axios").default

const getGeoCode = async (location) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZHp1bmduZ3V5ZW4iLCJhIjoiY2tnMjJmeTNwMDVibTJxbzF6aTh2aXpnOSJ9.SgV4_8znoolkhhLCwbXRTw`
    const { data } = await axios(url)
    const { place_name } = data.features[0]
    const [lon, lat] = data.features[0].center
    return { place_name, lon, lat }
  } catch (error) {
    if (error.code === "EAI_AGAIN")
      throw Error(
        "Can't connect to the server. Please check your internet connection."
      )
    throw Error("Your location is invalid.")
  }
}

module.exports = getGeoCode
