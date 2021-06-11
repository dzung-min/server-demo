const express = require("express")
const path = require("path")
const exphbs = require("express-handlebars")

const getGeoCode = require("./utils/getGeoCode")
const getWeatherInfo = require("./utils/getWeatherInfo")

const app = express()
const port = process.env.PORT || 3000

// config static folder
const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath))

// config view engine
app.engine(".hbs", exphbs({ extname: ".hbs" }))
app.set("view engine", ".hbs")

app.get("/", (req, res) => {
  res.render("index", { title: "Weather" })
})

app.get("/help", (req, res) => {
  res.render("help", { title: "Help" })
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About" })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "No location is provided." })
  } else {
    ;(async () => {
      try {
        const { lat, lon, place_name } = await getGeoCode(req.query.address)
        const { temperature, feelslike, weather_descriptions } =
          await getWeatherInfo(lat, lon)
        res.send({
          location: place_name,
          forecast: `${weather_descriptions}. It is ${temperature} degrees out. It feels like ${feelslike} degrees out.`,
        })
      } catch (error) {
        res.send({ error: error.message })
      }
    })()
  }
})

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`)
})
