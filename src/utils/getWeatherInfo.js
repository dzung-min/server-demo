const axios = require("axios").default

const getWeatherInfo = async (lat, lon) => {
  try {
    const url = `http://api.weatherstack.com/current?access_key=b6697f76dd83a79fd3d503adbdfe71b6&query=${lat},${lon}`
    const { data } = await axios.get(url)
    const weather_descriptions = data.current.weather_descriptions[0]
    const { temperature, feelslike } = data.current
    return { temperature, weather_descriptions, feelslike }
  } catch (error) {
    throw Error("Can not get weather data")
  }
}

module.exports = getWeatherInfo
