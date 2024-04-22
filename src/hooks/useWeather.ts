import axios from 'axios'
// import { z } from 'zod'
import { object, string, number, Output, parse } from 'valibot'
import type { SearchTypes } from '../types'
import { useMemo, useState } from 'react'

// funcion para castear weather a nuestro tipo Weather y tener autocompletado
// const isWeatherResponse = (weather : unknown): weather is Weather => {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
//     )
// }
// ZOD

// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_min: z.number(),
//         temp_max: z.number()
//     }) 
// })
// type Weather = z.infer<typeof Weather>

// Valibot

const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_min: number(),
        temp_max: number()

    })
})

export type Weather= Output<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
    }
}

export const useWeather = () => {
    const [weather, setWeather] = useState<Weather>(initialState)

    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchTypes) => {
        const appID = import.meta.env.VITE_API_KEY
        try {
            setLoading(true)
            setWeather(initialState)
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`
            const { data } = await axios(geoURL)
            // Comprobar la existencia de ciudad
            if(!data[0]){
                setNotFound(true)
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`

            // Type Guards 
            // const {data: weatherResult} = await axios(weatherURL)
            // const result = isWeatherResponse(weatherResult)
            // if (result) {
            //     console.log(weatherResult.name)
            // }

            // ZOD
            // const {data: weatherResult} = await axios(weatherURL)
            // const result = Weather.safeParse(weatherResult)
            // if (result.success) {
            //     console.log(result.data.name)
            //     console.log(result.data.main.temp)
            // } else {
            //     console.log('respuesta mal formada')
            // }

            // Valibot
            const {data: weatherResult} = await axios(weatherURL)
            const result = parse(WeatherSchema, weatherResult)
            if(result) {
                setWeather(result)
            } else {
                console.error('Respuesta mal formada ...')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])
    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}