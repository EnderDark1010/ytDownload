const fs = require("fs");
const file = fs.readFileSync("dlList.txt", "utf-8");
var exec = require("child_process").exec;

//Additional settings
let saveEmbededThumbnail = true;
let useArchive = true;
let additionalSettings = "";
if (saveEmbededThumbnail) {
  additionalSettings += "--embed-thumbnail";
}
if (useArchive) {
  additionalSettings += "--download-archive FILE";
}

//Folder settings and download caller
let dir = "none";
file.split(/\r?\n/).forEach((line) => {
  if (!line.startsWith("http")) {
    dir = line;
  } else {
    console.log(additionalSettings);
    //download(dir, line);
  }
});

//Download function
async function download(folder, link) {
  exec(
    `youtube-dl -o "dl/${folder}/\%(title)s.%(ext)s"  --extract-audio --audio-format mp3 ${link}  --rm-cache-dir ${additionalSettings}`,
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log("exec error: " + link + " " + error);
      }
      if (stderr !== null) {
        console.log("stderr: " + stderr);
      }
      if (stdout !== null) {
        console.log("stdout: " + stdout);
      }
    }
  );
}
