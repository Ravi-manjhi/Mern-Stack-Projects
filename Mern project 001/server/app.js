import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import postRouter from "./router/postRouter.js";
import usersRouter from "./router/userRouter.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/posts", postRouter);
app.use("/user", usersRouter);

mongoose
  .connect(process.env.MONDODB)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`server hosted on localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error.message));
