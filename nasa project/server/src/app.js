import express from "express";
import env from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import planetRouter from "./routes/planetRouter.js";
import launchRouter from "./routes/launchRouter.js";

// express setup
env.config({ path: "config.env" }); // Environment variable setup
const app = express(); // express setup
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "5mb", type: "application/json" })); //parser application/json
app.use(express.static(path.join(path.resolve(), "public")));

// router middleware for planet
app.use("/planets", planetRouter);
app.use("/launches", launchRouter);

// home router
app.get("/*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "public/index.html"));
});

// export app
export default app;
