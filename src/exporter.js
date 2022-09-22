import client from "prom-client";

const createPromClient = (tempCollector, humdityCollector) => {
  const tempGauge = new client.Gauge({
    name: "temperature",
    help: "temperature",
    async collect() {
      const temp = await tempCollector();
      this.set(temp);
    },
  });

  const humidityGauge = new client.Gauge({
    name: "humidity",
    help: "humidity",
    async collect() {
      const humidity = await humdityCollector();
      this.set(humidity);
    },
  });

  return client;
};

export default createPromClient;
