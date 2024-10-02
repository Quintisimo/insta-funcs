import fs from "node:fs";
import path from "node:path";
import { getPackages } from "./utils/code";
import { FOLDER_PATH } from "./utils/constants";
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
  .filter((pkg, index, self) => self.indexOf(pkg) === index);

installDeps(packages);
