import { ChangeEvent, useState, FormEvent } from "react";
import { countries } from "../data/countries";
import styles from './Form.module.css'
import { SearchTypes } from '../types/index';
import Alert from "./Alert/Alert";

type FormProps = {
    fetchWeather: (search : SearchTypes) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {

    const [search, setSeatch] = useState<SearchTypes>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSeatch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
    }
    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">Pais</label>
                <select 
                    value={search.country} 
                    name="country" 
                    id="country"
                    onChange={handleChange}
                >
                    <option value="">--- Selecciona un pais ---</option>
                    {countries.map(country => (
                        <option
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value='Consultar clima' />
        </form>
    )
}
