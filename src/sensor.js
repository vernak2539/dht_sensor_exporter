import sensor from "node-dht-sensor";

sensor.initialize({
  test: {
    fake: {
      temperature: 21,
      humidity: 60,
    },
  },
});

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
