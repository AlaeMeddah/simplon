import { degToCompass } from "../services/converters";
import {
  // getTime,
  // getAMPM,
  // getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.main.humidity}
        unit={"%"}
      />
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, weatherData.wind.speed)}
        unit={unitSystem == "metric" ? "m/s" : "m/h"}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.wind.deg)}
      />
      {/* removed visibility not passed by open-meteo
      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, weatherData.visibility)}
        unit={unitSystem == "metric" ? "km" : "miles"}
      /> */}
      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        // changed time function to match format
        // metric={getTime(
        //   unitSystem,
        //   weatherData.sys.sunrise,
        //   weatherData.timezone
        // )}
        // unit={getAMPM(
        //   unitSystem,
        //   weatherData.sys.sunrise,
        //   weatherData.timezone
        // )}
        metric={
          dayjs
            .utc(weatherData.daily.sunrise)
            .format(unitSystem === "metric" ? "HH:mm" : "hh:mm A")
        }
      />
      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        // changed time function to match format
        // metric={getTime(
        //   unitSystem,
        //   weatherData.sys.sunset,
        //   weatherData.timezone
        // )}
        // unit={getAMPM(unitSystem, weatherData.sys.sunset, weatherData.timezone)}
        metric={
          dayjs
            .utc(weatherData.daily.sunset)
            .format(unitSystem === "metric" ? "HH:mm" : "hh:mm A")
        }
      />
    </div>
  );
};
