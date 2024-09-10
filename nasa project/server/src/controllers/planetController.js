import planets from "../models/planetsModel.js";

export const planetController = (req, res, next) => {
  return res.status(200).json(planets);
};
