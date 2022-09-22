import express from "express";
import { SERVER } from "./config.js";

const server = (client) => {
  const app = express();

  app.get("/metrics", async (req, res) => {
    try {
      res.set("Content-Type", client.register.contentType);
      res.end(await client.register.metrics());
    } catch (err) {
      res.status(500).end(err);
    }
  });

  app.get("*", (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(`you are looking for http://localhost:${SERVER.PORT}/metrics`);
  });

  console.log(
    `Server listening to ${SERVER.PORT}, metrics exposed on /metrics endpoint`
  );
  app.listen(SERVER.PORT);
};

export default server;
