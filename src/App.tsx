"use client";
import "./App.css";
import { useState } from "react";
import Header from "./compornent/header";
import ClockContainer from "./compornent/clockContainer";
import TimeSlider from "./compornent/timeSlider";
import { currentTimeZone } from "./utils/time";

function App() {
  const initDate = new Date();
  const initTimeInMinutes: number =
    initDate.getHours() * 60 + initDate.getMinutes();
  console.log(initTimeInMinutes);

  const [timeInMinutes, setTimeInMinutes] = useState(initTimeInMinutes);
  console.log(initTimeInMinutes);

  const degHour = (timeInMinutes % 720) / 2;
  const degMinutes = (timeInMinutes % 60) * 6;

  const handleTimeChange = (time: number) => {
    setTimeInMinutes(time);
  };

  const [displayedCity, setDisplayedCity] = useState<string[]>([
    currentTimeZone,
  ]);
  console.log(displayedCity);

  return (
    <div className="h-screen">
      <Header
        displayedCity={displayedCity}
        setDisplayedCity={setDisplayedCity}
      />
      {displayedCity.map((city, index) => (
        <ClockContainer
          key={index}
          hour={degHour}
          minutes={degMinutes}
          timeInMinutes={timeInMinutes}
          city={city}
        />
      ))}
      <TimeSlider initSlideTime={timeInMinutes} onChange={handleTimeChange} />
    </div>
  );
}

export default App;
