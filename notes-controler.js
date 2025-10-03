const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dbPath = path.join(__dirname, "db.json");

async function addNote(title) {
  //const notes = require("./db.json");
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(dbPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs
    .readFile(dbPath, "utf-8")
    .then((data) => JSON.parse(data));
  return Array.isArray(notes) ? notes : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.inverse("Here is the list of notes:"));
  notes.forEach((note) => console.log(note.id, note.title));
}

async function removeNote(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== String(id));
  await fs.writeFile(dbPath, JSON.stringify(newNotes));
  console.log(chalk.bgRed("Note was removed"));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
