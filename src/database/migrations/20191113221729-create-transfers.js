"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("transfers", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },

      carweight_id: {
        type: Sequelize.INTEGER,
        references: { model: "car_weights", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },

      mat_type: {
        type: Sequelize.STRING,
        allowNull: false
      },

      mat_origin: {
        type: Sequelize.STRING,
        allowNull: false
      },

      mat_dest: {
        type: Sequelize.STRING,
        allowNull: false
      },

      weight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      comments: {
        type: Sequelize.STRING,
        allowNull: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("transfers");
  }
};
