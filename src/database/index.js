import { Sequelize } from "sequelize";

import User from "../app/models/User";

import databaseConfig from "../config/database";

import CarWeight from "../app/models/CarWeight";
import Transfer from "../app/models/Transfer";

const models = [User, CarWeight, Transfer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
