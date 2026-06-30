"use client";
import "./App.css";
import { useState } from "react";
import Header from "./compornent/header";
import ClockContainer from "./compornent/clockContainer";
import TimeSlider from "./compornent/timeSlider";
import { currentTimeZone } from "./utils/time";
import { DateTime } from "luxon";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";

function App() {
  const [utcTimeStamp, setUtcTimeStamp] = useState(() => Date.now());
  const [displayedCity, setDisplayedCity] = useState<string[]>([
    currentTimeZone,
  ]);

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

  const handleNow = () => {
    setUtcTimeStamp(Date.now());
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black font-fraunces">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Header
            displayedCity={displayedCity}
            setDisplayedCity={setDisplayedCity}
            handleNow={handleNow}
          />
        </div>
        <main className="">
          <div
            className={`flex flex-col h-full
        ${displayedCity.length === 1 && ""}
        ${displayedCity.length === 2 && "lg:flex-row"}
        ${displayedCity.length === 3 && "md:grid grid-cols-2 [&>div:first-child]:col-span-2 md:h-screen xl:h-screen xl:flex xl:flex-row"}
        ${displayedCity.length === 4 && "md:h-screen md:grid grid-cols-2"}`}
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
            displayedCity={displayedCity}
          />
        </main>
      </div>
      <footer className="bg-black text-white p-2 text-center">
        <div className=" flex justify-center">
          <p>&copy;Maho Kurauchi</p>
          <a
            target="_blank"
            href="https://github.com/mamahimiko/World_Clock.git"
            className="px-4"
          >
            <FaGithub />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/maho-kurauchi">
            <FaLinkedinIn />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
