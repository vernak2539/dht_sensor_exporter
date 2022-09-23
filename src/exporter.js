import client from "prom-client";
import { readSensorInformation } from "./sensor.js";

const createPromClient = (sensorConfig) => {
  const sensorReadingGauge = new client.Gauge({
    name: "dht_sensor_reading",
    help: "reading from dht sensor",
    labelNames: ["measurement"],
    async collect() {
      const { temperature, humidity } = await readSensorInformation(
        sensorConfig
      );
      this.labels("temperature").set(temperature);
      this.labels("humidity").set(humidity);
    },
  });

  return client;
};

export default createPromClient;
