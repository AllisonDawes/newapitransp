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

      date: {
        type: Sequelize.DATE,
        allowNull: false
      },

      carweight_id: {
        type: Sequelize.INTEGER,
        references: { model: "car_weights", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },

      weight_brute: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      car_weight: {
        type: Sequelize.FLOAT,
        allowNull: false
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

/**
 * COMANDOS SEQUELIZE:
 *
 * (instalar o sequelize)
 * yarn add sequelize
 *
 * (instalar a linha de comandos do sequelize como depedência de desenvolvimento)
 * yarn add sequelize-cli -D
 *
 * (criar um arquivo de migration na pasta database/migrations)
 * yarn sequelize migration:create --name=create-users
 *
 * (cria as tabelas na base de dados)
 * yarn sequelize db:migrate
 *
 * (desfaz uma tabela que tenha sido criada por ultimo)
 * yarn sequelize db:migrate:undo
 *
 * (desfaz todas as tabelas criadas na base de dados)
 * yarn sequelize db:migrate:undo:all
 */
