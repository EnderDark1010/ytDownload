const fs = require("fs");
const file = fs.readFileSync("dlList.txt", "utf-8");
var exec = require("child_process").exec;

let dir = "none";
file.split(/\r?\n/).forEach((line) => {
  if (!line.startsWith("http")) {
    dir = line;
  } else {
    download(dir,line);
  }
});

async function download(folder,link) {
  exec(
    `youtube-dl -o "dl/${folder}/\%(title)s.%(ext)s" --extract-audio --audio-format mp3 ${link}`,
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log("exec error: " + link+" " +error);
      }
    }
  );
}
