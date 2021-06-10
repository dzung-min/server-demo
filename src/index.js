const express = require("express")
const path = require("path")

const app = express()
const publicPath = path.join(__dirname, "../public")

app.use(express.static(publicPath))

app.get("/", (req, res) => {
  res.send("Hello express")
})

app.listen(3000, () => {
  console.log("Server has been started on port 3000")
})
