const express = require("express")
const cors = require("cors")
const axios = require("axios")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

const baseUrl = "http://api.weatherapi.com/v1"
const key = process.env.API_KEY
const normalisedCityName = (name) => {
  return name
    .toLowerCase()
    .split(" ")
    .filter((el) => el.length > 0)
    .join("-")
}

app.get("/:city/forecast/:hour/:days?", (request, response) => {
  const city = normalisedCityName(request.params.city)
  const days = request.params.days || 1
  const hour = request.params.hour

  axios
    .get(
      `${baseUrl}/forecast.json?key=${key}&q=${city}&days=${days}&hour=${hour}`
    )
    .then((res) => response.status(res.status).json(res.data))
    .catch((err) => {
      console.log(err)
      response.status(err.response.status).json(err.response.data)
    })
})

app.listen(port, () => `Server listening on port ${port}.`)
