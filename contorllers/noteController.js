const { Note, Notebook, Tag, Note_Tags } = require("../db/models.js");

//Fetch
exports.fetchNote = async (noteId) => {
    try {
        const note = await Note.findByPk(noteId);
        return note;
    } catch (error) {
        next(error)
    }
};



//List
exports.noteList = async (req, res, next) => {
    try {
        const notes = await Note.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [{
                model: Notebook,
                as: "notebook",
                attributes: ["name"],
            }
                , {
                model: Tag,
                attributes: ["id"],
                through: {
                    model: Note_Tags,
                }
            },
            ],
        });
        res.json(notes);
    } catch (error) {
        next(error);
    }
};

//Update
exports.noteUpdate = async (req, res, next) => {
    try {
        await req.note.update(req.body);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

//Delete
exports.noteDelete = async (req, res, next) => {
    try {
        await req.note.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

//tagCreate
exports.tagCreate = async (req, res, next) => {
    try {
        req.body.noteId = req.note.id;
        const newTag = await Tag.create(req.body);

        res.status(201).json(newTag);
    } catch (error) {
        next(error);
    }
};
