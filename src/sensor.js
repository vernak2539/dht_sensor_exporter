import sensor from "node-dht-sensor";

sensor.initialize({
  test: {
    fake: {
      temperature: 21,
      humidity: 60,
    },
  },
});

const readSensorInformation = (sensorConfig) => {
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

export const tempCollector = (sensorConfig) => async () => {
  const { temperature } = await readSensorInformation(sensorConfig);
  return temperature;
};

export const humdityCollector = (sensorConfig) => async () => {
  const { humidity } = await readSensorInformation(sensorConfig);
  return humidity;
};
