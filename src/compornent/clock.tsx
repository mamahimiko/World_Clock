type clockProps = {
  clockArm: number[];
  displayedCity: string[];
};

const Clock = ({ clockArm, displayedCity }: clockProps) => {
  return (
    <>
      <div
        className={`bg-gray-200/70 w-70 h-70 lg:w-85 lg:h-85 relative rounded-full drop-shadow-lg
        ${displayedCity.length === 1 && ""}
        ${displayedCity.length === 2 && ""}
        ${displayedCity.length === 3 && "lg:w-70 lg:h-70 xl:w-85 xl:h-85"}
        ${displayedCity.length === 4 ? "lg:w-65 lg:h-65 " : ""}
        `}
      >
        <div
          className="absolute origin-bottom w-4 h-20 lg:w-3 lg:h-25 bg-blue-200 top-[calc(50%-80px)] left-[calc(50%-8px)] lg:top-[calc(50%-100px)] lg:left-[calc(50%-8px)] drop-shadow-sm"
          style={{ transform: `rotate(${clockArm[0]}deg)` }}
        ></div>
        <div
          className="absolute origin-bottom w-2.5 h-30 lg:w-2.5 lg:h-40 bg-blue-400 top-[calc(50%-120px)] left-[calc(50%-10px)] lg:top-[calc(50%-160px)] lg:left-[calc(50%-8px)] drop-shadow-sm"
          style={{ transform: `rotate(${clockArm[1]}deg)` }}
        ></div>
      </div>
    </>
  );
};

export default Clock;
