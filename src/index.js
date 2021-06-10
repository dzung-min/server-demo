const express = require("express")
const path = require("path")
const exphbs = require("express-handlebars")

const app = express()
const port = 3000

// config static folder
const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath))

// config view engine
app.engine(".hbs", exphbs({ extname: ".hbs" }))
app.set("view engine", ".hbs")

app.get("/", (req, res) => {
  res.render("index", { title: "Weather" })
})

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`)
})
