module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "bdtransp",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
