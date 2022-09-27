import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import start from "src/start.js";

Sentry.init({
  dsn: "https://3f7afb1bbecf4f83bbff2b00c65a1210@o1429321.ingest.sentry.io/6779964",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

start();
