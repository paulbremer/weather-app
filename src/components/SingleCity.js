import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleCity.css';
import sunriseIcon from '../assets/icons/sunrise.svg';
import sunsetIcon from '../assets/icons/sunset.svg';
import humidityIcon from '../assets/icons/humidity.svg';
import windIcon from '../assets/icons/wind.svg';
import { secondsToTime, getHours, getDateTime, mileToKilometer } from '../helper';

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

    return (
        <>
            {weatherData.city && (
                <>
                    <div className="details-now">
                        <div className="left-side">
                            <div className="city-details">
                                <div className="city-name">{weatherData.city.name}</div>
                                <div className="description">{weatherData.list[0].weather[0].description}</div>
                            </div>
                            <div className="sun-details">
                                <div className="sunrise">
                                    <img src={sunriseIcon} alt="Sunrise" style={{ filter: 'invert(1)', height: '30px' }} />
                                    <div>{secondsToTime(weatherData.city.sunrise)}</div>
                                </div>
                                <div className="sunset">
                                    <img src={sunsetIcon} alt="Sunset" style={{ filter: 'invert(1)', height: '30px' }} />
                                    <div>{secondsToTime(weatherData.city.sunset)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="other-details">
                                <div className="humidity">
                                    <img src={humidityIcon} alt="Humidity" style={{ filter: 'invert(1)', height: '30px' }} />
                                    <div>{weatherData.list[0].main.humidity}%</div>
                                </div>
                                <div className="wind">
                                    <img src={windIcon} alt="Wind" style={{ filter: 'invert(1)', height: '30px' }} />
                                    <div>{mileToKilometer(weatherData.list[0].wind.speed)} km/h</div>
                                </div>
                            </div>
                            <div className="temp-details">
                                <div className="icon">
                                    <img src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`} alt={weatherData.list[0].weather[0].description} />
                                </div>
                                <div className="temp">{Math.round(weatherData.list[0].main.temp)} &#8451;</div>
                            </div>
                        </div>
                    </div>

                    <div className="hourly-list">
                        {weatherData && weatherData.list.map((item, index) => {
                            return (
                                <div key={item.dt}>
                                    {index === 0 && getHours(item.dt) > 3 && <div className="date">Today</div>}

                                    {index > 0 && getHours(item.dt) < 3 && <div className="date">{getDateTime(item.dt)}</div>}

                                    <div  className="hourly-item">
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
