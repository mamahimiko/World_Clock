import Modal from "./modal";
import Button from "./button";

type headerProps = {
  displayedCity: string[];
  setDisplayedCity: React.Dispatch<React.SetStateAction<string[]>>;
  handleNow: () => void;
};

const Header = ({
  displayedCity,
  setDisplayedCity,
  handleNow,
}: headerProps) => {
  return (
    <div className="bg-white/10 border border-white/10">
      <div className="flex justify-between py-4 px-6 xl:px-8 text-4xl">
        <Button handleNow={handleNow} />
        <Modal
          displayedCity={displayedCity}
          setDisplayedCity={setDisplayedCity}
        />
      </div>
    </div>
  );
};

export default Header;
