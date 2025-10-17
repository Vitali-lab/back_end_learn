const chalk = require("chalk");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");

async function addUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, password: passwordHash });
  console.log(chalk.bgGreen("User was added"));
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User doesn't exist");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Password is incorrect");
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.inverse("Here is the list of notes:"));
  notes.forEach((note) => console.log(note.id, note.title));
}

async function removeNote(id) {
  await Note.deleteOne({ _id: id });
  console.log(chalk.bgRed("Note was removed"));
}

async function editNote(id, newContent) {
  await Note.updateOne({ _id: id }, { title: newContent });
  console.log(chalk.bgGreen("Note was edited"));
}

module.exports = {
  addUser,
  loginUser,
};
