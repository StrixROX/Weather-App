import { useContext } from "react"
import { WeatherContext } from "../contexts/WeatherContext"

function WeatherSimple() {
  const weather = useContext(WeatherContext)

  return (
    <div>
      <p>Simple weather data:</p>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  )
}

export { WeatherSimple }
