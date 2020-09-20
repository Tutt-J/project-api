//Require the db config
const dbConfig = require("../../config/db.config.js");
//Require Sequelize
const Sequelize = require("sequelize");

//Create the sequelize object
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: Number(dbConfig.pool.max),
        min: Number(dbConfig.pool.min),
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
