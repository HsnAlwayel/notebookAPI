const { Notebook, Note } = require("../db/models.js/index.js");

//Fetch
exports.fetchNotebook = async (notebookId, next) => {
    try {
        const notebook = await Notebook.findByPk(notebookId);
        return notebook;
    } catch (error) {
        next(error)
    }
};

//Notebook Create
exports.notebookCreate = async (req, res, next) => {
    try {
        const newNotebook = await Notebook.create(req.body);
        res.status(201).json(newNotebook);
    } catch (error) {
        next(error);
    }
};

//Notebook List
exports.notebookList = async (req, res, next) => {
    try {
        const notebooks = await Notebook.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Note,
                    as: "notes",
                    attributes: ["id"],
                }
            ]
        });
        res.json(notebooks);
    } catch (error) {
        next(error);
    }
};

//Notebook Update
exports.notebookUpdate = async (req, res, next) => {
    try {
        await req.notebook.update(req.body);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

//Notebook Delete
exports.notebookDelete = async (req, res, next) => {
    try {
        await req.notebook.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
};

//NoteCreate
exports.noteCreate = async (req, res, next) => {
    try {
        req.body.notebookId = req.notebook.id;
        const newNote = await Note.create(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};
