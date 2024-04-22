export const formatTemperature = (temperature : number) : number => {
    const kelvin = 273.15

    // Conversion a string por que... no se, funciona
    return parseInt((temperature - kelvin).toString())
}