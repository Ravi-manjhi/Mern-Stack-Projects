import express from "express";
import {
  HttpGetAllLaunches,
  HttpAddNewLaunches,
  httpDeleteLaunch,
} from "../controllers/launchController.js";

const router = express.Router();

router.route("/").get(HttpGetAllLaunches).post(HttpAddNewLaunches);
router.delete("/:id", httpDeleteLaunch);

export default router;
