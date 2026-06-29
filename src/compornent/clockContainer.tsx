import Clock from "./clock";
import { calTimeFromMinutes, currentTimeZone } from "@/utils/time";
import { RxCross2 } from "react-icons/rx";

type clockContainerProps = {
  clockArm: number[];
  timeInMinutes: number;
  city: string;
  displayedCity: string[];
  setDisplayedCity: React.Dispatch<React.SetStateAction<string[]>>;
};

const ClockContainer = ({
  clockArm,
  timeInMinutes,
  city,
  displayedCity,
  setDisplayedCity,
}: clockContainerProps) => {
  const Time = calTimeFromMinutes(timeInMinutes);

  const handleClose = () => {
    setDisplayedCity(displayedCity.filter((item) => item !== city));
  };

  const dayProgress = timeInMinutes / 1439;
  const peaks = {
    night: 0,
    sunrise: 0.25,
    noon: 0.5,
    sunset: 0.75,
  };
  const calculateOpacity = (progress: number, peak: number, spread: number) => {
    const distance = Math.abs(progress - peak);
    return Math.exp(-(distance * distance) / (2 * spread * spread));
  };

  const opacities = {
    night:
      calculateOpacity(dayProgress, peaks.night, 0.15) +
      calculateOpacity(dayProgress, 1, 0.15),

    sunrise: calculateOpacity(dayProgress, peaks.sunrise, 0.12),

    noon: calculateOpacity(dayProgress, peaks.noon, 0.25),

    sunset: calculateOpacity(dayProgress, peaks.sunset, 0.12),
  };

  const textColor = {
    r: Math.round(255 - opacities.noon * 40),
    g: Math.round(255 - opacities.noon * 40),
    b: Math.round(255 - opacities.noon * 55),
  };

  return (
    <div
      className={`relative flex flex-col w-full overflow-hidden bg-slate-950
        ${displayedCity.length === 1 && "h-screen"}
        ${displayedCity.length === 2 && "h-1/2 lg:h-screen"}
        ${displayedCity.length === 3 && ""}
        ${displayedCity.length === 4 && "md:gap-4 md:items-center"}`}
    >
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500"
        style={{
          opacity: opacities.night * 0.4,
        }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-900 to-indigo-950 transition-opacity duration-100 ease-linear"
        style={{ opacity: opacities.night }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-[#4f46e5] via-amber-[#f59e0b] to-[#fde68a] transition-opacity duration-100 ease-linear"
        style={{ opacity: opacities.sunrise }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-blue-700 via-sky-400 to-cyan-100 transition-opacity duration-100 ease-linear"
        style={{ opacity: opacities.noon }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-[#1e1b4b] via-[#ea580c] to-[#7c3aed] transition-opacity duration-100 ease-linear"
        style={{ opacity: opacities.sunset }}
      />
      <div
        className="relative z-10 flex justify-center h-full"
        style={{
          color: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
        }}
      >
        <div
          className={`flex flex-col gap-14 p-4 text-center w-full overflow-hidden max-h-200 mt-15 items-center
        ${displayedCity.length === 1 && "mt-30"}
        ${displayedCity.length === 2 && "items-center lg:gap-14 lg:mt-30"}
        ${displayedCity.length === 3 && "gap-14 items-center xl:mt-30"}
        ${displayedCity.length === 4 && "xl:max-w-200"}`}
        >
          <div className="flex">
            <p className="text-4xl ">{city.substring(city.indexOf("/") + 1)}</p>
            {city !== currentTimeZone ? (
              <div className="absolute top-18 right-4 text-2xl h-1 p-2">
                <RxCross2 onClick={handleClose} className="text-2xl" />
              </div>
            ) : (
              <div className="" />
            )}
          </div>
          <Clock clockArm={clockArm} displayedCity={displayedCity} />
          <div className="">
            <p className="text-5xl">{Time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockContainer;
