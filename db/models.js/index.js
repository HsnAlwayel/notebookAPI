const Note = require("./Note");
const Notebook = require("./Notebook");
const Tag = require("./Tag");
const Note_Tags = require("./Note_Tags");

Notebook.hasMany(Note, { as: "notes", foreignKey: "notebookId" });

//Notebook ->Notes
Note.belongsTo(Notebook, { as: "notebook" });

//Notes <-> Tags
Note.belongsToMany(Tag, { through: Note_Tags });
Tag.belongsToMany(Note, { through: Note_Tags });


module.exports = {
  Note,
  Notebook,
  Tag,
  Note_Tags,
};
