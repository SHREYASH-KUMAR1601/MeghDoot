import React, { useState } from 'react'
import Search from './Components/Search'
import {WeatherContext} from './Context/WeatherContext'
import SevenDayForecast from './Components/SevenDayForecast';

function App() {
  return (
    <div className='bg-gray-900 min-h-screen'>

      <Search/>
      <SevenDayForecast/>

    </div>
  )
}

export default App