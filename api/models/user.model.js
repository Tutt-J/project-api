var SequelizeSlugify = require('sequelize-slugify')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already in use!'
            },
            validate: {
                notNull: { msg: "username is required" },
            }
        },
        slug: {
            type: Sequelize.STRING,
            unique: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "first_name is required" },
            }
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "last_name is required" },
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "email is required" },
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "password is required" },
            }
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "street is required" },
            }
        },
        postal_code: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "postal_code is required" },
            }
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "city is required" },
            }
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "country is required" },
            }
        },
        last_login: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    });

    SequelizeSlugify.slugifyModel(User, {
        source: ['username']
    });

    return User;
};