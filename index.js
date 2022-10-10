import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import start from "./src/start.js";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

start();
