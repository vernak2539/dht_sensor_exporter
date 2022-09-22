import sensor from "node-dht-sensor";
import { DHT22 } from "./config.js";

sensor.initialize({
  test: {
    fake: {
      temperature: 21,
      humidity: 60,
    },
  },
});

const readSensorInformation = (sensorType) => {
  return new Promise((resolve, reject) => {
    sensor.read(DHT22.TYPE, DHT22.PIN, (err, temperature, humidity) => {
      if (err) {
        return reject(err);
      }
      resolve({ temperature, humidity });
    });
  });
};

export const tempCollector = async () => {
  const { temperature } = await readSensorInformation();
  return temperature;
};

export const humdityCollector = async () => {
  const { humidity } = await readSensorInformation();
  return humidity;
};
