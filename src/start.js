import server from "./server.js";
import createPromClient from "./exporter.js";
import {
  generateConfig,
  outputFriendlyConfig,
  parseCmdConfig,
} from "./config.js";
import { initSensorTesting } from "./sensor.js";

const cmdConfig = parseCmdConfig(process.argv);
const TEST_MODE = cmdConfig.testMode === "on";

if (TEST_MODE) {
  initSensorTesting();
}

const config = generateConfig(cmdConfig);

const startExporter = async () => {
  try {
    const promClient = await createPromClient(config.sensor);

    outputFriendlyConfig(config, TEST_MODE);

    server(config, promClient);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default startExporter;
