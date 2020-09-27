module.exports = (sequelize, Sequelize) => {
    const Prerequisite = sequelize.define("prerequisite", {
        title: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.ENUM('Matériel', 'Pédagogique')
        }
    });

    return Prerequisite;
};