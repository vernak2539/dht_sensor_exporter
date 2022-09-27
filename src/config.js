import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const parseCmdConfig = (processArgs) => {
  return yargs(hideBin(processArgs))
    .options({
      pin: {
        alias: "p",
        description: "GPIO pin providing data to DHT sensor",
        default: 4,
      },
      sensor: {
        alias: "s",
        description: "Sensor type being used (DHTxx)",
        choices: [11, 22],
        default: 22,
      },
      "server-port": {
        alias: "sp",
        describe: "exporter server port",
        default: 8765,
      },
      "test-mode": {
        alias: "t",
        description: "Run in test mode with sensor values defaulted",
        choices: ["on", "off"],
        default: "off",
      },
    })
    .help("help").argv;
};

export const generateConfig = (cmdConfig) => {
  const exporterConfig = {
    port: cmdConfig.serverPort,
    sensor: {
      name: `DHT${cmdConfig.sensor}`,
      pin: cmdConfig.pin,
      type: cmdConfig.sensor,
    },
  };

  return exporterConfig;
};

export const outputFriendlyConfig = (config, TEST_MODE) => {
  const { port, sensor } = config;
  const tmpl = `
DHT Sensor Exporter
====================================
TEST MODE: ${TEST_MODE}
Server: http://localhost:${port}
Metrics Endpoint: http://localhost:${port}/metrics
Sensor: ${sensor.name}
  - Type: ${sensor.type}
  - Pin: ${sensor.pin}

It's Alive!!!
`;
  console.log(tmpl.trim());
};
