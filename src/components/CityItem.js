import React from 'react';
import { Link } from 'react-router-dom';
import windIcon from '../assets/icons/wind.svg';
import './CityItem.css';

const CityItem = (props) => {
    const { weather } = props;

    return (
        <Link to={`/city-details/${weather.name.toLowerCase()}`} className="item-container">
            <div className="city-name">
                <h3>{weather.name}</h3>
            </div>
            <div className="current-temp">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${Math.round(weather.main.temp)} &#8451;`} />
                <div>{Math.round(weather.main.temp)} &#8451;</div>
            </div>
            <div className="avg-temp">
                <div>{Math.round(weather.main.temp_min)} / {Math.round(weather.main.temp_max)} &#8451;</div>
                </div>
            <div className="wind-speed">
                <img src={windIcon} alt="Wind Speed" />
                <div>{Math.round(weather.wind.speed * 1.60934)} km/h</div>
            </div>
        </Link>
    )
}

export default CityItem;
