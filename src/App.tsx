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

  const cityCurrentTime = (city: string): number => {
    const timeZoneData = DateTime.fromMillis(utcTimeStamp, {
      zone: "utc",
    }).setZone(city);
    const timeZoneOffset: number = timeZoneData.offset;

    const cityTimeStamp = utcTimeStamp + timeZoneOffset * 60 * 1000;
    const dayMinutes = 60 * 24;
    const timeZoneInMinutes = Math.floor(
      (cityTimeStamp / (60 * 1000)) % dayMinutes,
    );

    return timeZoneInMinutes;
  };

  const initTimeInMinutes: number =
    currentTImeZoneTime.hour * 60 + currentTImeZoneTime.minute;

  const [timeInMinutes, setTimeInMinutes] = useState(initTimeInMinutes);

  const clockArm = (city: string) => {
    const degHour = (cityCurrentTime(city) % 720) / 2;
    const degMinutes = (cityCurrentTime(city) % 60) * 6;
    const hourAndMinute = [degHour, degMinutes];
    return hourAndMinute;
  };

  const handleTimeChange = (time: number) => {
    const currentMinutes = cityCurrentTime(currentTimeZone);
    const diff = time - currentMinutes;
    setUtcTimeStamp((prev) => prev + diff * 60 * 1000);
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
              clockArm={clockArm(city)}
              timeInMinutes={cityCurrentTime(city)}
              city={city}
              displayedCity={displayedCity}
              setDisplayedCity={setDisplayedCity}
            />
          ))}
        </div>
        <TimeSlider
          value={cityCurrentTime(currentTimeZone)}
          onChange={handleTimeChange}
        />
      </main>
    </div>
  );
}

export default App;
