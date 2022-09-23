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
  try {
    const promClient = await createPromClient(config.sensor);

    outputFriendlyConfig(config);

    server(config, promClient);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startExporter();
