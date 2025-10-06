const express = require("express");
const chalk = require("chalk");
const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require("./notes-controler");

const port = 3002;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Hello",
    notes: await getNotes(),
    created: false,
  });
});
app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Hello",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  removeNote(req.params.id);
  res.render("index", {
    title: "Hello",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  const newContent = req.body.newContent;
  await editNote(req.params.id, newContent);
  res.render("index", {
    title: "Hello",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () =>
  console.log(chalk.green(`Server has been started on port ${port}`))
);
