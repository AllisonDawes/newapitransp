import { Model, Sequelize } from "sequelize";

class CarWeight extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        truck: Sequelize.STRING,
        car_weight: Sequelize.DECIMAL(10, 3)
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

export default CarWeight;
