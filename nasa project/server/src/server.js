import http from "http";
import app from "./app.js";
import { loadPlanetsData } from "./models/planetsModel.js";
const port = process.env.PORT || 3000;

const server = http.createServer(app);

await loadPlanetsData();
server.listen(port, () => {
  console.log(`Server listen on localhost:${port}...`);
});
