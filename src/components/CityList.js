import React, { useState, useEffect } from 'react'
import CityItem from './CityItem';
import './CityList.css'

const cities = ['Amsterdam', 'London', 'Berlin', 'Madrid', 'Rome', 'Paris'];

const CityList = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() =>  {
        // Get the current weather data by city name
        cities.map(async city => {
            const response = await fetch(`${process.env.REACT_APP_OWM_URL}/weather?q=${city}&units=metric&appId=${process.env.REACT_APP_API_KEY}`);
            const json = await response.json();
            setWeatherData(weatherData => [...weatherData, json]);
            setLoading(false)
            return json;
        });
    }, []);

    return (
        <article>
            {loading && <div className="loader">Loading...</div>}

            {!loading && (
                weatherData.map(cityWeather => <CityItem key={cityWeather.name} weather={cityWeather} />)
            )}
        </article>
    )
}

export default CityList;
