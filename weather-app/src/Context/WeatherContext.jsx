import React, { createContext, useState } from 'react';

export const WeatherContext = createContext(null);

export const WeatherProvider = (props) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    return (
        <WeatherContext.Provider value={{ latitude, longitude, setLatitude, setLongitude }}>
            {props.children}
        </WeatherContext.Provider>
    );
};
