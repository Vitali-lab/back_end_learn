const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { addNote, printNotes, removeNote } = require("./notes-controler");

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add a new note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    handler({ title }) {
      addNote(title);
    },
  })
  .command({
    command: "list",
    describe: "Print all notes",
    async handler() {
      printNotes();
    },
  })
  .command({
    command: "remove",
    describe: "Remove note by id",
    async handler({ id }) {
      removeNote(id);
    },
  })

  .parse();
