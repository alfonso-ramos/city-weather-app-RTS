import Form from './components/Form'
import styles from './App.module.css'
import { useWeather } from './hooks/useWeather'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import Spinner from './components/Spinner/Spinner'
import Alert from './components/Alert/Alert'

function App() {

  const {weather,loading, fetchWeather, hasWeatherData, notFound} = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form 
          fetchWeather={fetchWeather}
        />
        {loading && <Spinner />}
        {hasWeatherData &&
          <WeatherDetail 
            weather={weather}
          />
        }
        {notFound && 
          <Alert>
            Ciudad no econtrada.
          </Alert>}
      </div>
    </>
  )
}

export default App
  