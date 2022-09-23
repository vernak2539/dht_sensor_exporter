import server from "./src/server.js";
import createPromClient from "./src/exporter.js";
import {
  generateConfig,
  outputFriendlyConfig,
  parseCmdConfig,
} from "./src/config.js";

const cmdConfig = parseCmdConfig(process.argv);
const config = generateConfig(cmdConfig);

const startExporter = async () => {
  outputFriendlyConfig(config);

  const promClient = createPromClient(config.sensor);

  server(config, promClient);
};

startExporter();
