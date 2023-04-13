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

app.get("/:city/current/", (request, response) => {
  let city = normalisedCityName(request.params.city)

  axios
    .get(`${baseUrl}/current.json?key=${key}&q=${city}`)
    .then((res) => response.status(res.status).json(res.data))
    .catch((err) => {
      console.log(err)
      response.status(err.response.status).json(err.response.data)
    })
})

app.get("/:city/forecast/:days?", (request, response) => {
  let city = normalisedCityName(request.params.city)
  let days = request.params.days || 1

  axios
    .get(`${baseUrl}/forecast.json?key=${key}&q=${city}&days=${days}`)
    .then((res) => response.status(res.status).json(res.data))
    .catch((err) => {
      console.log(err)
      response.status(err.response.status).json(err.response.data)
    })
})

app.listen(port, () => `Server listening on port ${port}.`)
