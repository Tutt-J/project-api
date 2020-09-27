module.exports = (sequelize, Sequelize) => {
    const Chapter = sequelize.define("chapter", {
        title: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        video:{
            type: Sequelize.STRING
        },
        resume:{
            type: Sequelize.TEXT
        }
    });

    return Chapter;
};