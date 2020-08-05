const Note = require("./Note");
const Notebook = require("./Notebook");

Notebook.hasMany(Note, { as: "notes", foreignKey: "notebookId" });

Note.belongsTo(Notebook, { as: "notebook" });

module.exports = {
  Note,
  Notebook,
};
