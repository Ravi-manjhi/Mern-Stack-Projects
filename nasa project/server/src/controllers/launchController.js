import {
  getAllLaunches,
  addNewLaunches,
  abortLaunchById,
} from "../models/launchesModel.js";

export const HttpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

export const HttpAddNewLaunches = (req, res) => {
  const body = req.body;
  body.launchDate = new Date(body.launchDate);

  if (!body.mission || !body.rocket || !body.target || !body.launchDate) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  if (isNaN(body.launchDate)) {
    return res.status(400).json({
      error: "Invalid Date ",
    });
  }

  const newLaunch = addNewLaunches(body);
  return res.status(201).json(newLaunch);
};

export const httpDeleteLaunch = (req, res) => {
  const id = +req.params.id;
  const aborted = abortLaunchById(id);
  if (aborted) {
    return res.status(200).json(aborted);
  }
  return res
    .status(404)
    .json({ error: "Operation failed! Mission not found." });
};
