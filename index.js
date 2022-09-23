import server from "./src/server.js";
import createPromClient from "./src/exporter.js";
import { tempCollector, humdityCollector } from "./src/sensor.js";
import { generateConfig, parseCmdConfig } from "./src/config.js";

const cmdConfig = parseCmdConfig(process.argv);
const config = generateConfig(cmdConfig);

const startExporter = async () => {
  const promClient = createPromClient(
    tempCollector(config.sensor),
    humdityCollector(config.sensor)
  );

  server(config, promClient);
};

startExporter();
