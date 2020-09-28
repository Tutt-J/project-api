var SequelizeSlugify = require('sequelize-slugify')

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "title is required" },
            },
        },
        slug: {
            type: Sequelize.STRING,
            unique: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: "description is required" },
            }
        },
        level:{
            type: Sequelize.ENUM({
                values: ['easy', 'average', 'difficult']
            }),
            allowNull: false,
            validate: {
                notNull: { msg: "level is required" },
                isIn: {
                    args: [['easy', 'average', 'difficult']],
                    msg: "Wrong level, please choose between easy, average and difficult"
                }
            }
        },
        duration:{
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "duration is required" },
            }
        },
        video:{
            type: Sequelize.STRING,
            allowNull: true
        },
        published: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: { msg: "published is required" },
            }
        }
    });

    SequelizeSlugify.slugifyModel(Tutorial, {
        source: ['title']
    });


    return Tutorial;
};