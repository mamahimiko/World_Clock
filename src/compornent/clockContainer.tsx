import Clock from "./clock";
import { calTimeFromMinutes, currentTimeZone } from "@/utils/time";

type clockContainerProps = {
  hour: number;
  minutes: number;
  timeInMinutes: number;
  city: string;
};

const ClockContainer = ({
  hour,
  minutes,
  timeInMinutes,
  city,
}: clockContainerProps) => {
  const Time = calTimeFromMinutes(timeInMinutes);

  return (
    <div className="p-14 text-center">
      <div className="p-10">
        <p className="text-4xl">{city.substring(city.indexOf("/") + 1)}</p>
      </div>
      <Clock hour={hour} minutes={minutes} />
      <div className="p-10">
        <p className="text-5xl">{Time}</p>
      </div>
    </div>
  );
};

export default ClockContainer;
