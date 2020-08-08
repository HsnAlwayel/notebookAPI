const express = require("express");
const router = express.Router();

const {
  fetchTag,
  tagList,
  tagUpdate,
  tagDelete,
  tagCreate,
} = require("../contorllers/tagController");

//Param
router.param("tagId", async (req, res, next, tagId) => {
  const tag = await fetchTag(tagId, next);
  if (tag) {
    req.tag = tag;
    next();
  } else {
    const err = new Error("Tag Not Found");
    err.status = 404;
    next(err);
  }
});
//List
router.get("/", tagList);

//Create Tag
router.post("/", tagCreate);

//Update
router.put("/:tagId", tagUpdate);

//Delete
router.delete("/:tagId", tagDelete);

module.exports = router;
