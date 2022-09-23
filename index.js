const server = require("./src/server");
const createPromClient = require("./src/exporter");
const {
  generateConfig,
  outputFriendlyConfig,
  parseCmdConfig,
} = require("./src/config");

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
