import client from "prom-client";
import Sentry from "@sentry/node";
import { readSensorInformation, checkForSensor } from "./sensor.js";

const createPromClient = async (sensorConfig) => {
  try {
    await checkForSensor(sensorConfig);
  } catch (err) {
    let e = new Error("Failed to recognize sensor");
    e.original_error = err;
    e.stack = e.stack.split("\n").slice(0, 2).join("\n") + "\n" + err.stack;
    throw e;
  }

  new client.Gauge({
    name: "dht_sensor_reading",
    help: "reading from dht sensor",
    labelNames: ["measurement"],
    async collect() {
      Sentry.setExtras(sensorConfig);

      try {
        const { temperature, humidity } = await readSensorInformation(
          sensorConfig
        );
        this.labels("temperature").set(temperature);
        this.labels("humidity").set(humidity);
      } catch (err) {
        Sentry.captureException(err);
      }
    },
  });

  return client;
};

export default createPromClient;
