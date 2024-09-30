import fs from "node:fs";
import path from "node:path";
import { FOLDER_PATH } from "./utils/constants";
import { getPackages } from "./utils/code";
import { installDeps } from "./utils/deps";

if (!fs.existsSync(FOLDER_PATH)) {
  fs.mkdirSync(FOLDER_PATH);
}

const fileNames = fs.readdirSync(FOLDER_PATH);
const packages = fileNames
  .flatMap((fileName) => {
    const filePath = path.join(FOLDER_PATH, fileName);
    const code = fs.readFileSync(filePath, "utf8");
    return getPackages(code);
  })
  .filter(function (pkg, index, self) {
    return self.indexOf(pkg) == index;
  });

installDeps(packages);
