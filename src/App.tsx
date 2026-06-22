"use client"
import './App.css'
import { useState } from 'react'
import Clock from './compornent/clock'
import TimeSlider from './compornent/timeSlider'

function App() {

  const initDate = new Date()
  const initTime:number = (initDate.getHours() * 60) + initDate.getMinutes()
  console.log(initDate)
  console.log(initTime)
  
  const [date, setDate] = useState(initDate);
  const currentTime: [number,number] = [date.getHours(), date.getMinutes()];

  const [h, m] = currentTime
  const degHour = h * (360 / 12) + m * (360 / 12 /60);
  const degMinutes = m * (360 / 60)

  const currentMinutes = (60 * h) + m
  const handleTimeChange = (time: number) => {
    console.log(time)
  }
  

  return (
    <div >
      <Clock hour={degHour} minutes={degMinutes}/>
      <TimeSlider initSlideTime={currentMinutes} onChange={handleTimeChange} />
    </div>
  )
}

export default App
