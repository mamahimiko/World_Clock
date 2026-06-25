import Modal from "./modal";

type headerProps = {
  displayedCity: string[];
  setDisplayedCity: React.Dispatch<React.SetStateAction<string[]>>;
};

const Header = ({ displayedCity, setDisplayedCity }: headerProps) => {
  return (
    <div>
      <div className="flex flex-row-reverse py-4 px-6 xl:py-6 xl:px-8 text-4xl">
        <Modal
          displayedCity={displayedCity}
          setDisplayedCity={setDisplayedCity}
        />
      </div>
    </div>
  );
};

export default Header;
