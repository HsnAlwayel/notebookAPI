const { Tag, Tagbook, Tag_Tags, Note } = require("../db/models.js");
const { model } = require("../db/db.js");

//Fetch
exports.fetchTag = async (tagId) => {
    try {
        const tag = await Tag.findByPk(tagId);
        return tag;
    } catch (error) {
        next(error)
    }
};



//List
exports.tagList = async (req, res, next) => {
    try {
        const tags = await Tag.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
                model: Note,
                attributes: ["id"],
            }

        });
        res.json(tags);
    } catch (error) {
        next(error);
    }
};

//Update
exports.tagUpdate = async (req, res, next) => {
    try {
        await req.tag.update(req.body);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

//Delete
exports.tagDelete = async (req, res, next) => {
    try {
        await req.tag.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};


