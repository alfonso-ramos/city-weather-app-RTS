export type SearchTypes = {
    city: string
    country: string
}

export type County = {
    code: string
    name:string
}

export type Weather = {
    name: string
    main: {
        temp: number
        temp_max: number
        temp_min: number
    }
}