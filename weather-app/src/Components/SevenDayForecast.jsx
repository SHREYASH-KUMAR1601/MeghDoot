import React, { useState, useEffect, useContext } from 'react';
import {WeatherContext} from '../Context/WeatherContext';
const apiKey = 'da4815c62c25499d81984525242606';
const BASE_URL = "http://api.weatherapi.com/v1/";
const days = 7;
const SevenDayForecast = () => {
    const { latitude,longitude,setLatitude,setLongitude } = useContext(WeatherContext);
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                // Replace with your actual weather API endpoint and API key
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=${days}`);
                const data = await response.json();
                console.log(data);
                // Assuming data.forecast contains the 7-day forecast array
                setForecast(data.forecast.forecastday);
            } catch (error) {
                console.error('Error fetching forecast:', error);
            }
        };

        if (latitude !== null && longitude !== null) {
            fetchForecast();
        }
    }, [latitude, longitude]);

    return (
        <div className="mt-4">
            {/* <h2>7-Day Weather Forecast</h2> */}
            <div className="grid grid-cols-7 gap-4">
                {forecast.map((day, index) => (
                    <div key={index} className="bg-gray-200 p-4 rounded-lg">
                        <p>Date: {day.date}</p>
                        <p>Condition: {day.day.condition.text}</p>
                        <p>High: {day.day.maxtemp_c} °C</p>
                        <p>Low: {day.day.mintemp_c} °C</p>
                        <img src={day.day.condition.icon} alt="Weather Icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SevenDayForecast;
