import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const parseCmdConfig = (processArgs) => {
  return yargs(hideBin(processArgs))
    .option("sensor", {
      alias: "s",
      describe: "sensor type",
      choices: ["DHT11", "DHT22", "AM2302"],
      default: "DHT11",
    })
    .option("port", {
      alias: "p",
      describe: "exporter server port",
      default: 8765,
    })
    .coerce(["sensor"], (s) => s.toUpperCase())
    .help("help").argv;
};

export const generateConfig = (cmdConfig) => {
  const exporterConfig = { port: cmdConfig.port, sensor: {} };

  switch (cmdConfig.sensor) {
    case "DHT11":
      exporterConfig.sensor = { type: 11, pin: 17 };
      break;
    case "DHT22":
    case "AM2302":
      exporterConfig.sensor = { type: 22, pin: 4 };
      break;
    default:
      throw new Error("you should never get here due to defaults");
  }

  return exporterConfig;
};