import { Slider as SliderPrimitive } from "radix-ui";
import { Badge } from "@/components/ui/badge.tsx";
import { useState } from "react";

type TimeSliderProps = {
  initSlideTime: number;
  onChange: (value: number) => void;
};

const TimeSlider = ({ initSlideTime, onChange }: TimeSliderProps) => {
  const minutesOfDay = 1440;
  const [slideTime, setSlideTime] = useState<number[]>([initSlideTime]);
  const hours = Math.floor(slideTime[0] / 60);
  const minutes = slideTime[0] % 60;

  const handleChange = (newValue: number[]) => {
    setSlideTime(newValue);
    onChange?.(newValue[0]);
  };

  return (
    <>
      <div className="relative m-auto flex w-[50%] flex-col items-center -bottom-50">
        <SliderPrimitive.Root
          className="relative flex w-full touch-none select-none items-center"
          defaultValue={slideTime}
          max={minutesOfDay}
          onValueChange={handleChange}
          step={1}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
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
