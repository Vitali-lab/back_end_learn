const express = require("express");
const chalk = require("chalk");
const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require("./notes-controler");
const { addUser, loginUser } = require("./user-controler");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

const port = 3002;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Hello",
    error: undefined,
  });
});
app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);

    res.redirect("/login");
  } catch (err) {
    if (err.code === 11000) {
      return res.render("register", {
        title: "Hello",
        error: "User already exists",
      });
    }
    console.log(err);

    res.render("register", {
      title: "Hello",
      error: err.message,
    });
  }
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Hello",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("login", {
      title: "Hello",
      error: err.message,
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });

  res.redirect("/login");
});
app.use(auth);

app.get("/", async (req, res) => {
  const notes = await getNotes();
  res.render("index", {
    title: "Hello",
    notes,
    created: false,
  });
});
app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title, req.user.email);
    res.render("index", {
      title: "Hello",
      notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.render("index", {
      title: "Hello",
      notes: await getNotes(),
      created: false,
    });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    removeNote(req.params.id, req.user.email);
    res.render("index", {
      title: "Hello",
      notes: await getNotes(),
      created: false,
      error: false,
      userEmail: req.user.email,
    });
  } catch {
    console.log(err);
    res.render("index", {
      title: "Hello",
      notes: await getNotes(),
      created: false,
      error: err.message,
      userEmail: req.user.email,
    });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const newContent = req.body.newContent;
    await editNote(req.params.id, newContent, req.user.email);
    res.render("index", {
      title: "Hello",
      notes: await getNotes(),
      created: false,
      error: false,
      userEmail: req.user.email,
    });
  } catch (err) {
    console.log(err);
    res.render("index", {
      title: "Hello",
      notes: await getNotes(),
      created: false,
      error: err.message,
      userEmail: req.user.email,
    });
  }
});

mongoose
  .connect("mongodb://admin:secret@localhost:27017/")
  .then(() => {
    app.listen(port, () =>
      console.log(chalk.green(`Server has been started on port ${port}`))
    );
  })
  .catch((err) => {
    console.log(err);
  });
