module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        street: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        last_login: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    });

    return User;
};