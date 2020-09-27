module.exports = (sequelize, Sequelize) => {
    const Goal = sequelize.define("goal", {
        title: {
            type: Sequelize.STRING
        }
    });

    return Goal;
};