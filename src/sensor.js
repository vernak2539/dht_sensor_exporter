import sensor from "node-dht-sensor";

if (process.env.SENSOR_TESTING === "true") {
  console.log("---> TESTING MODE ENABLED");
  sensor.initialize({
    test: {
      fake: {
        temperature: 21,
        humidity: 60,
      },
    },
  });
}

export const readSensorInformation = (sensorConfig) => {
  return new Promise((resolve, reject) => {
    sensor.read(
      sensorConfig.type,
      sensorConfig.pin,
      (err, temperature, humidity) => {
        if (err) {
          return reject(err);
        }
        resolve({ temperature, humidity });
      }
    );
  });
};
