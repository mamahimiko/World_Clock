import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { continentals, getAllCountriesName } from "@/utils/time";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "lucide-react";

type ModalProps = {
  displayedCity: string[];
  setDisplayedCity: React.Dispatch<React.SetStateAction<string[]>>;
};

const Modal = ({ displayedCity, setDisplayedCity }: ModalProps) => {
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleContinentValue = (value: string) => {
    setSelectedContinent(value);
  };

  const handleCityValue = (value: string) => {
    setSelectedCity(value);
  };

  const citiesArray = getAllCountriesName(selectedContinent);

  const handleOnClick = (city: string) => {
    if (!city) return;
    if (displayedCity.length >= 4) return;
    if (displayedCity.find((c) => c === city)) return;
    setDisplayedCity([...displayedCity, city]);
  };

  return (
    <div>
      <div className="flex flex-row-reverse text-4xl">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <FaPlus className="text-white cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Select City</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Continents</Label>
                  <Select onValueChange={handleContinentValue}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a continent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Continent</SelectLabel>
                        {continentals.map((continental, index) => (
                          <SelectItem key={index} value={continental}>
                            {continental}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <Label htmlFor="username-1">City</Label>
                  <Select onValueChange={handleCityValue}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>City</SelectLabel>
                        {citiesArray.map((city, index) => (
                          <SelectItem
                            key={index}
                            value={city}
                            disabled={displayedCity?.includes(city)}
                          >
                            {city
                              .substring(city.indexOf("/") + 1)
                              .replace(/_/g, " ")}
                            {displayedCity?.includes(city) ? <CheckIcon /> : ""}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="button"
                  onClick={() => handleOnClick(selectedCity)}
                >
                  Add City
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default Modal;
