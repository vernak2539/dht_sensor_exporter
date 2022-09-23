import server from "./src/server.js";
import createPromClient from "./src/exporter.js";
import { tempCollector, humdityCollector } from "./src/sensor.js";
import {
  generateConfig,
  outputFriendlyConfig,
  parseCmdConfig,
} from "./src/config.js";

const cmdConfig = parseCmdConfig(process.argv);
const config = generateConfig(cmdConfig);

const startExporter = async () => {
  outputFriendlyConfig(config);

  const promClient = createPromClient(
    tempCollector(config.sensor),
    humdityCollector(config.sensor)
  );

  server(config, promClient);
};

startExporter();
