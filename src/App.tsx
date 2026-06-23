"use client"
import './App.css'
import { useState } from 'react'
import ClockContainer from './compornent/clockContainer'
import TimeSlider from './compornent/timeSlider'

function App() {

  const initDate = new Date()
  const initTimeInMinutes:number = (initDate.getHours() * 60) + initDate.getMinutes()
  
  const [timeInMinutes, setTimeInMinutes] = useState(initTimeInMinutes);

  const degHour = ((timeInMinutes % 720) / 2)
  const degMinutes = ((timeInMinutes % 60) * 6)

  const handleTimeChange = (time: number) => {
    setTimeInMinutes(time)
  }

  return (
    <div className='h-screen'>
      <ClockContainer hour={degHour} minutes={degMinutes} timeInMinutes={timeInMinutes}/>
      <TimeSlider initSlideTime={timeInMinutes} onChange={handleTimeChange} />
    </div>
  )
}

export default App
