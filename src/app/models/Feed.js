import { Model, Sequelize } from "sequelize";

class Feed extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        feed: Sequelize.STRING,
        status: Sequelize.BOOLEAN
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

export default Feed;
