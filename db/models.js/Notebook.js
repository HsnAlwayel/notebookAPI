const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const SequelizeSlugify = require("sequelize-slugify");

class Notebook extends Model { }

Notebook.init(
    {
        name: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },

    },
    {
        sequelize: db,
    }
);

SequelizeSlugify.slugifyModel(Notebook, {
    source: [`name`]
});

module.exports = Notebook;