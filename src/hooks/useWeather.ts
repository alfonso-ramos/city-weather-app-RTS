import axios from 'axios'
// import { z } from 'zod'
import { object, string, number, Output, parse, set } from 'valibot'
import type { SearchTypes } from '../types'
import { useState } from 'react'

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

type Weather= Output<typeof WeatherSchema>

export const useWeather = () => {
    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
        }
    })
    const fetchWeather = async (search: SearchTypes) => {
        const appID = import.meta.env.VITE_API_KEY
        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`
            const { data } = await axios(geoURL)
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
            console.log(result)
            if(result) {
                setWeather(result)
            } else {
                console.error('Respuesta mal formada ...')
            }


        } catch (error) {
            console.error(error)
        }
    }
    return {
        fetchWeather
    }
}