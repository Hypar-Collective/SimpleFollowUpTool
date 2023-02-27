const fs = require("fs");

const args = process.argv;

const path = args[2];

const getFilesInDir = async (path) => {
  const files = fs.readdirSync(path);
  console.log(files);
  return files;
};

const getUUIDFromName = (fileName) => {
  const indexOfDash = fileName.indexOf("-");
  const uuid = fileName.slice(indexOfDash + 1).split(".")[0];
  return uuid;
};

const writeFollowUps = async () => {
  const files = await getFilesInDir(path);

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

    const rawdata = fs.readFileSync(path + file);
    const data = JSON.parse(rawdata);
    data.followUpAnimation = idOfNextFile;
    fs.writeFileSync(path + file, JSON.stringify(data));
  }

  console.log(`Done writing!`);
};

writeFollowUps();
