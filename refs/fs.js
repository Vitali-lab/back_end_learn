const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const base = path.join(__dirname, "temp");

const getContent = () => `
\r${process.argv[2] ?? "Hello"}`;

async function start() {
  try {
    if (fsSync.existsSync(base)) {
      fs.appendFile(path.join(base, "file1.txt"), getContent());
      const data = await fs.readFile(path.join(base, "file1.txt"), "utf-8");
      console.log(data);
    } else {
      await fs.mkdir(base);
      console.log("Directory was created");
      fs.writeFile(path.join(base, "file1.txt"), getContent());
    }
  } catch (err) {
    console.log(err);
  }
}

start();
