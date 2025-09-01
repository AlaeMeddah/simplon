// import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "./DateAndTime.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateAndTime = ({ weatherData, unitSystem }) => {

  const dayOfWeek = dayjs(weatherData.dt).format("dddd");
  const dateFormat = unitSystem === "metric" ? "DD/MM/YYYY" : "MM/DD/YYYY";
  const date = dayjs(weatherData.dt).format(dateFormat);
  const timeFormat = unitSystem === "metric" ? "HH:mm" : "hh:mm A";
  const hour = dayjs(weatherData.dt).format(timeFormat);

  return (
    <div className={styles.wrapper}>
      <h2>
        {/* changed time function to match format
        {`${getWeekDay(weatherData)}, ${getTime(
          unitSystem,
          weatherData.dt,
          weatherData.timezone
        )} ${getAMPM(unitSystem, weatherData.dt, weatherData.timezone)}`} */}
        {dayOfWeek}, {date}, {hour}
      </h2>
    </div>
  );
};
