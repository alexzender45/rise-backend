import express from "express";
import config from "config";
import log from "./utils/logger";
import routes from "./routes";

//const port = config.get<number>("port");
const app = express();

app.use(express.json());

app.listen('3001', async () => {
  log.info("Listening on port 3000");
  routes(app);
});
