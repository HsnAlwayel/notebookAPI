const express = require("express");
const router = express.Router();

const {
  notebookList,
  notebookCreate,
  notebookUpdate,
  notebookDelete,
  fetchNotebook,
  noteCreate,
} = require("../contorllers/notebookContorller");

//Param
router.param("notebookId", async (req, res, next, notebookId) => {
  const notebook = await fetchNotebook(notebookId, next);
  if (notebook) {
    req.notebook = notebook;
    next();
  } else {
    const err = new Error("Notebook Not Found");
    err.status = 404;
    next(err);
  }
});
//List
router.get("/", notebookList);

//Create
router.post("/", notebookCreate);

//Update
router.put("/:notebookId", notebookUpdate);

//Delete
router.delete("/:notebookId", notebookDelete);

//Create Note
router.post("/:notebookId/notes", noteCreate);

module.exports = router;
