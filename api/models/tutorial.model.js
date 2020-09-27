module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        level:{
            type: Sequelize.INTEGER
        },
        duration:{
            type: Sequelize.INTEGER
        },
        video:{
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial;
};