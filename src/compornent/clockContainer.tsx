import Clock from "./clock";
import { calTimeFromMinutes, currentTimeZone } from "@/utils/time";
import { RxCross2 } from "react-icons/rx";

type clockContainerProps = {
  hour: number;
  minutes: number;
  timeInMinutes: number;
  city: string;
  displayedCity: string[];
  setDisplayedCity: React.Dispatch<React.SetStateAction<string[]>>;
};

const ClockContainer = ({
  hour,
  minutes,
  timeInMinutes,
  city,
  displayedCity,
  setDisplayedCity,
}: clockContainerProps) => {
  const Time = calTimeFromMinutes(timeInMinutes);

  const handleClose = () => {
    setDisplayedCity(displayedCity.filter((item) => item !== city));
  };

  return (
    <div
      className={`flex flex-col gap-14 p-14 text-center w-full 
        ${displayedCity.length === 3 && "md:p-4 md:gap-4 xl:gap-14 xl:p-14"}
        ${displayedCity.length === 4 && "md:p-4 md:gap-4 "}`}
    >
      {city !== currentTimeZone ? (
        <div className="flex flex-row-reverse text-2xl h-1">
          <RxCross2 onClick={handleClose} />
        </div>
      ) : (
        <div className="w-8" />
      )}

      <div className="">
        <p className="text-4xl">{city.substring(city.indexOf("/") + 1)}</p>
      </div>
      <Clock hour={hour} minutes={minutes} />
      <div className="">
        <p className="text-5xl">{Time}</p>
      </div>
    </div>
  );
};

export default ClockContainer;
