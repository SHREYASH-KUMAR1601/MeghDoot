
import React, { useContext, useState } from "react";
import { WeatherContext } from "../Context/WeatherContext";

export const Search = () => {
  const { latitude, longitude, setLatitude, setLongitude } = useContext(WeatherContext);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.trim().length > 0) {
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=2d8eb37dd1802163f8b4ece24aa850d7`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
      
        const newQuery = `${suggestion.name}${suggestion.state ? ", " + suggestion.state : ""}${suggestion.country ? ", " + suggestion.country : ""}`;
        setQuery(newQuery);
        setLatitude(suggestion.lat);
        setLongitude(suggestion.lon);
        setSuggestions([]);
    };

    return (
        <div className="w-2/3 mx-auto my-auto py-4">
            <input
                type="text"
                placeholder="Search for cities"
                className="px-4 w-full py-3 border-black border-3 rounded-xl text-2xl bg-gray-800 text-gray-50 justify-center"
                value={query}
                onChange={handleInputChange}
            />
            <ul className="mt-2 bg-gray-800 px-4 w-full rounded-xl text-gray-50 text-2xl">
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="py-2 border-b border-white cursor-pointer"
                    >
                        <span>{suggestion.name}</span>
                        {suggestion.state && <span>, {suggestion.state}</span>}
                        {suggestion.country && <span>, {suggestion.country}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
