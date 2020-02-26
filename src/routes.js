import Router from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import CarWeightController from "./app/controllers/CarWeightController";
import TransferController from "./app/controllers/TransferController";
import ProgramationController from "./app/controllers/ProgramationController";
import SumTransfers from "./app/controllers/SumTransfers";
import FeedController from "./app/controllers/FeedController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

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
routes.delete("/transfers/:id", TransferController.delete);

routes.get("/sumtransfers", SumTransfers.index);

routes.post("/feeds", FeedController.store);
routes.get("/feeds", FeedController.index);
routes.delete("/feeds/:id", FeedController.delete);

export default routes;
