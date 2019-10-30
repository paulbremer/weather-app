import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleCity.css';

const SingleCity = () => {
    let { city } = useParams();

    const [weatherData, setWeatherData] = useState({});

    useEffect(() =>  {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_OWM_URL}/forecast?q=${city}&units=metric&appId=${process.env.REACT_APP_API_KEY}`);
            const json = await response.json();
            setWeatherData(json)
        };

        fetchData();
    }, [city]);

    const secondsToTime = (time) => {
        const hours = new Date(time * 1000).getHours();
        return hours > 12 ? `${hours - 12}:00pm` : `${hours}:00am`;
    }

    return (
        <>
            {weatherData.city && (
                <>
                    <div className="details-now">
                        <div className="left-side">
                            <div className="city-details">
                                <div className="city-name">{weatherData.city.name}</div>
                            </div>
                        </div>
                        <div className="right-side"></div>
                    </div>

                    <div className="hourly-list">
                        {weatherData && weatherData.list.map(item => {
                            return (
                                <div key={item.dt} className="hourly-item">
                                    <div className="hourly-details">
                                        <div className="description-time">
                                            <div className="time">{secondsToTime(item.dt)}</div>
                                            <div className="description">{item.weather[0].description}</div>
                                        </div>
                                        <div className="temp-details">
                                            <div className="icon">
                                                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                                            </div>
                                            <div className="temp">{Math.round(item.main.temp)} &#8451;</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </>
            )}
        </>
    )
}

export default SingleCity;
