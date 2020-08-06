const express = require("express");
const router = express.Router();

const {
    noteList,
    noteUpdate,
    noteDelete,
    fetchNote,
    tagCreate,
} = require("../contorllers/noteController");

//Param
router.param("noteId", async (req, res, next, noteId) => {
    const note = await fetchNote(noteId, next);
    if (note) {
        req.note = note;
        next();
    } else {
        const err = new Error("Note Not Found");
        err.status = 404;
        next(err);
    }
});
//List
router.get("/", noteList);

//Update
router.put("/:noteId", noteUpdate);

//Delete
router.delete("/:noteId", noteDelete);

//Create Tag
router.post("/:noteId/tags", tagCreate);
module.exports = router;