import fs from "fs";
import path from "path";

const currentDir = path.join(__dirname, "data", "bundles", "Misc", "Performance");
const fileContent = fs.readFileSync(path.join(currentDir, "10kb.json")).toString();

const fileJson = JSON.parse(fileContent);

for (let i = 0; i < 100; i++) {
    fileJson.id = "001578f8-0b76-4197-afd9-ludger751" + i;
    fileJson.identifier.value = "001578f8-0b76-4197-afd9-ludger751" + i;
    fs.writeFileSync(
        path.join(currentDir, "ManyFiles_100", `10kb_${i}.json`),
        JSON.stringify(fileJson)
    );
}

for (let i = 0; i < 1000; i++) {
    fileJson.id = "001578f8-0b76-4197-afd9-ludger751" + i;
    fileJson.identifier.value = "001578f8-0b76-4197-afd9-ludger751" + i;
    fs.writeFileSync(
        path.join(currentDir, "ManyFiles_1000", `10kb_${i}.json`),
        JSON.stringify(fileJson)
    );
}
