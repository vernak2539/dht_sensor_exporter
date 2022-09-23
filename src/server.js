import express from "express";

const server = (config, promClient) => {
  const app = express();

  app.get("/metrics", async (req, res) => {
    try {
      res.set("Content-Type", promClient.register.contentType);
      res.end(await promClient.register.metrics());
    } catch (err) {
      res.status(500).end(err);
    }
  });

  app.get("*", (req, res) => {
    res.set("Content-Type", promClient.register.contentType);
    res.end(`You are looking for http://localhost:${config.port}/metrics`);
  });

  app.listen(config.port);
};

export default server;
