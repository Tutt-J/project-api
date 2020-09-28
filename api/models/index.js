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

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.chapter = require("./chapter.model")(sequelize, Sequelize);
db.prerequisite = require("./prerequisite.model")(sequelize, Sequelize);
db.goal = require("./goal.model")(sequelize, Sequelize);
db.user_tutorials = sequelize.define('user_tutorials');
//RELATIONS
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id"
});

db.tutorial.belongsToMany(db.user, {
    through: "user_tutorials",
    foreignKey: "tutorial_id",
    otherKey: "user_id"
});
db.user.belongsToMany(db.tutorial, {
    through: "user_tutorials",
    foreignKey: "user_id",
    otherKey: "tutorial_id"
});

db.chapter.hasMany(db.user_tutorials,{ foreignKey: 'chapter_id' }, { onDelete: 'cascade' })


db.tutorial.belongsTo(db.user, { foreignKey: 'user_id' })
db.user.hasMany(db.tutorial,{ foreignKey: 'user_id' }, { onDelete: 'cascade' })

db.chapter.belongsTo(db.tutorial, { foreignKey: 'tutorial_id' })
db.tutorial.hasMany(db.chapter,{ foreignKey: 'tutorial_id' }, { onDelete: 'cascade' })

db.prerequisite.belongsTo(db.tutorial, { foreignKey: 'tutorial_id' })
db.tutorial.hasMany(db.prerequisite,{ foreignKey: 'tutorial_id' }, { onDelete: 'cascade' })

db.goal.belongsTo(db.tutorial, { foreignKey: 'tutorial_id' })
db.tutorial.hasMany(db.goal,{ foreignKey: 'tutorial_id' }, { onDelete: 'cascade' })

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
