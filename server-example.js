const http = require("http");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs/promises");
const { addNote } = require("./notes-controler");

const port = 3002;

const basePath = path.join(__dirname, "pages");

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(content);
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, { "Content-Type": "text/plain", charset: "utf-8" });
    req.on("data", (data) => body.push(data));
    console.log(Buffer.from(body));

    req.on("end", async () => {
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title);
      res.end(`title - ${title}`);
    });
  }
});

server.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}`));
});
