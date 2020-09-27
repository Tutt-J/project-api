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

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
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

db.tutorials.belongsToMany(db.user, {
    through: "user_tutorials",
    foreignKey: "tutorial_id",
    otherKey: "user_id"
});
db.user.belongsToMany(db.tutorials, {
    through: "user_tutorials",
    foreignKey: "user_id",
    otherKey: "tutorial_id"
});

db.chapter.hasMany(db.user_tutorials,{ foreignKey: 'chapter_id' }, { onDelete: 'cascade' })


db.tutorials.belongsTo(db.user, { foreignKey: 'user_id' })
db.user.hasMany(db.tutorials,{ foreignKey: 'user_id' }, { onDelete: 'cascade' })

db.chapter.belongsTo(db.tutorials, { foreignKey: 'tutorial_id' })
db.tutorials.hasMany(db.chapter,{ foreignKey: 'tutorial_id' }, { onDelete: 'cascade' })

db.prerequisite.belongsTo(db.tutorials, { foreignKey: 'tutorial_id' })
db.tutorials.hasMany(db.prerequisite,{ foreignKey: 'tutorial_id' }, { onDelete: 'cascade' })

db.goal.belongsTo(db.tutorials, { foreignKey: 'tutorial_id' })
db.tutorials.hasMany(db.goal,{ foreignKey: 'tutorial_id' }, { onDelete: 'cascade' })

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
