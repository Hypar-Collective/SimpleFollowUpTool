const fs = require("fs");

const args = process.argv;

const folderPath = args[2];

const getFilesInDir = async (_path) => {
  const files = fs.readdirSync(_path);
  console.log(files);
  return files;
};

const getUUIDFromName = (fileName) => {
  const indexOfDash = fileName.indexOf("-");
  const uuid = fileName.slice(indexOfDash + 1).split(".")[0];
  return uuid;
};

const writeFollowUps = async () => {
  const files = await getFilesInDir(folderPath);

  console.log(`Writing to ${files.length} files...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    let idOfNextFile = "";
    if (i !== files.length - 1) {
      idOfNextFile = getUUIDFromName(files[i + 1]);
    } else {
      idOfNextFile = getUUIDFromName(files[0]);
    }

    console.log(`Writing to ${files[i]}...`);

    const rawdata = fs.readFileSync(path.join(folderPath, file));
    const data = JSON.parse(rawdata);
    data.followUpAnimation = idOfNextFile;
    fs.writeFileSync(path.join(folderPath, file), JSON.stringify(data));
  }

  console.log(`Done writing!`);
};

writeFollowUps();
