const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Note_Tags extends Model { }

Note_Tags.init(
    {

    },
    {
        sequelize: db,
    }
);



module.exports = Note_Tags;
