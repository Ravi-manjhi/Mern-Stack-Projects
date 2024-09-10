import express from "express";
import { planetController } from "../controllers/planetController.js";

const router = express.Router();

// router
router.get("/", planetController);

export default router;
