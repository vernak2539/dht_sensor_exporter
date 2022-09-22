import server from "./src/server.js";
import createPromClient from "./src/exporter.js";
import { tempCollector, humdityCollector } from "./src/sensor.js";

const startExporter = async () => {
  const promClient = createPromClient(tempCollector, humdityCollector);

  server(promClient);
};

startExporter();
