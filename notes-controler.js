const path = require("path");
const chalk = require("chalk");
const Note = require("./models/Note");

async function addNote(title, owner) {
  await Note.create({ title, owner });
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.inverse("Here is the list of notes:"));
  notes.forEach((note) => console.log(note.id, note.title));
}

async function removeNote(id, owner) {
  await Note.deleteOne({ _id: id, owner });
  console.log(chalk.bgRed("Note was removed"));
}

async function editNote(id, newContent, owner) {
  const result = await Note.updateOne(
    { _id: id, owner },
    { title: newContent }
  );
  if (result.matchedCount === 0) {
    throw new Error("Note not found");
  }
  console.log(chalk.bgGreen("Note was edited"));
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  editNote,
  removeNote,
};
