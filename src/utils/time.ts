import ct from "countries-and-timezones";
import { DateTime } from "luxon";

export const calTimeFromMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h} : ${m < 10 ? "0" + m : m}`;
};

export const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // europa/sweden
const currentTimeZoneTime = DateTime.now().setZone(currentTimeZone);

const currentZoneUtcTime = ct.getTimezone(currentTimeZone);
console.log(currentZoneUtcTime);

export const continentals = [
  "Asia",
  "Africa",
  "America",
  "Antarctica",
  "Europe",
  "Australia",
  "Pacific",
];

export const getAllCountriesName = (continent: string) => {
  const getTimezones = Object.values(ct.getAllTimezones());

  return getTimezones
    .filter((tz: any) => tz.name.startsWith(continent))
    .map((tz: any) => tz.name);
};
