import { Slider as SliderPrimitive } from "radix-ui";
import { Badge } from "@/components/ui/badge.tsx";
import { useState, useEffect } from "react";

type TimeSliderProps = {
  value: number;
  onChange: (value: number) => void;
  displayedCity: string[];
};

const TimeSlider = ({ value, onChange, displayedCity }: TimeSliderProps) => {
  const minutesOfDay = 1440;
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:764px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <>
      <div
        className={`
            ${
              isMobile
                ? "fixed bottom-50 left-[8%] -translate-x-1/2 w-15 max-w-md z-30 flex flex-col items-center"
                : "absolute bottom-[40%] left-[25%] w-[50%] z-30 flex flex-col items-center"
            }
            ${displayedCity.length === 1 ? "md:bottom-[15%] xl:bottom-40" : ""}
            ${displayedCity.length === 2 ? "md:bottom-[15%] lg:bottom-[0.5%] xl:bottom-40" : ""}
            ${displayedCity.length === 3 ? "md:bottom-[1.5%] lg:bottom-[0.5%] xl:bottom-40" : ""}
            ${displayedCity.length === 4 ? "md:bottom-[1.5%] lg:bottom-[0.2%] xl:bottom-[0.5%]" : ""}
            `}
      >
        <SliderPrimitive.Root
          className={`relative flex w-full touch-none select-none items-center 
    ${isMobile ? "h-64 w-10 flex-col" : "w-full h-10"}`}
          value={[value]}
          max={minutesOfDay}
          onValueChange={handleChange}
          orientation={isMobile ? "vertical" : "horizontal"}
          step={1}
        >
          <SliderPrimitive.Track
            className={`relative grow overflow-hidden rounded-full bg-primary/20 
              ${isMobile ? "w-1.5 h-full" : "h-1.5 w-full"}`}
          >
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            {/* Sticky label */}
            <Badge className="absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible">
              <span>
                {hours}:{minutes < 10 ? "0" + minutes : minutes}
              </span>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-primary" />
            </Badge>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>
    </>
  );
};

export default TimeSlider;
