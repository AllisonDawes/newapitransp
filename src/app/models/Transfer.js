import { Model, Sequelize } from "sequelize";

class Transfer extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        carweight_id: Sequelize.INTEGER,
        weight_brute: Sequelize.FLOAT,
        car_weight: Sequelize.FLOAT,
        date: Sequelize.DATE,
        mat_type: Sequelize.STRING,
        mat_origin: Sequelize.STRING,
        mat_dest: Sequelize.STRING,
        weight: Sequelize.FLOAT,
        comments: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.CarWeight, {
      foreignKey: "carweight_id",
      as: "carweight"
    });
  }
}

export default Transfer;
