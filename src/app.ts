import express from "express";
import log from "./utils/logger";
import routes from "./routes";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, async () => {
  log.info("Listening on port 3000");
  routes(app);
});
