import "./css/app.css"

import { WeatherSimple } from "./components/WeatherSimple"
import { WeatherProvider } from "./contexts/WeatherContext"

function App() {
  return (
    <div className="wrapper weather-app">
      <WeatherProvider>
        <WeatherSimple />
      </WeatherProvider>
    </div>
  )
}

export default App
