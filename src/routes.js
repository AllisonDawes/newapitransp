import "dotenv/config";
import Router from "express";
import BruteRedis from "express-brute-redis";
import Brute from "express-brute";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import CarWeightController from "./app/controllers/CarWeightController";
import TransferController from "./app/controllers/TransferController";
import ProgramationController from "./app/controllers/ProgramationController";
import SumTransfers from "./app/controllers/SumTransfers";
import FeedController from "./app/controllers/FeedController";
import PermissionController from "./app/controllers/PermissionController";
import CanceledController from "./app/controllers/CanceledController";
//import FilterTransferController from "./app/controllers/FilterTransferController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

const BruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(BruteStore);

routes.post("/users", UserController.store);
routes.post("/session", bruteForce.prevent, SessionController.store);

routes.use(authMiddleware);

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users", UserController.update);

routes.get("/programations", ProgramationController.show);
routes.post("/programations", ProgramationController.store);
routes.put("/programations/:id", ProgramationController.update);

routes.get("/carweight", CarWeightController.show);
routes.post("/carweight", CarWeightController.store);
routes.put("/carweight/:id", CarWeightController.update);

routes.get("/transfers/:date", TransferController.index);
routes.post("/transfers", TransferController.store);
routes.put("/transfers/:id", TransferController.update);
routes.delete("/transfers/:id", TransferController.delete);

routes.get("/sumtransfers", SumTransfers.index);

routes.post("/feeds", FeedController.store);
routes.get("/feeds", FeedController.index);
routes.delete("/feeds/:id", FeedController.delete);

routes.put("/users/permission/:id", PermissionController.update);

routes.put("/canceleds/:id", CanceledController.update);

//routes.get("/filterstransfers/:date", FilterTransferController.index);

export default routes;
