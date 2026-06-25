"use client";
import "./App.css";
import { useState } from "react";
import Header from "./compornent/header";
import ClockContainer from "./compornent/clockContainer";
import TimeSlider from "./compornent/timeSlider";
import { currentTimeZone } from "./utils/time";
import { DateTime } from "luxon";

function App() {
  const [utcTimeStamp, setUtcTimeStamp] = useState(() => Date.now());
  const [displayedCity, setDisplayedCity] = useState<string[]>([
    currentTimeZone,
  ]);

  const currentTImeZoneTime = DateTime.fromMillis(utcTimeStamp, {
    zone: "utc",
  }).setZone(currentTimeZone);

  const initTimeInMinutes: number =
    currentTImeZoneTime.hour * 60 + currentTImeZoneTime.minute;

  const [timeInMinutes, setTimeInMinutes] = useState(initTimeInMinutes);

  const degHour = (timeInMinutes % 720) / 2;
  const degMinutes = (timeInMinutes % 60) * 6;

  const handleTimeChange = (time: number) => {
    setTimeInMinutes(time);
  };

  return (
    <div className="h-screen">
      <Header
        displayedCity={displayedCity}
        setDisplayedCity={setDisplayedCity}
      />
      <main>
        <div
          className={`flex flex-col
        ${displayedCity.length === 1 && ""}
        ${displayedCity.length === 2 && "lg:flex-row"}
        ${displayedCity.length === 3 && "md:grid grid-cols-2 [&>div:first-child]:col-span-2 xl:flex xl:flex-row"}
        ${displayedCity.length === 4 && "md:grid grid-cols-2"}`}
        >
          {displayedCity.map((city, index) => (
            <ClockContainer
              key={index}
              hour={degHour}
              minutes={degMinutes}
              timeInMinutes={timeInMinutes}
              city={city}
              displayedCity={displayedCity}
              setDisplayedCity={setDisplayedCity}
            />
          ))}
        </div>
        <TimeSlider initSlideTime={timeInMinutes} onChange={handleTimeChange} />
      </main>
    </div>
  );
}

export default App;
