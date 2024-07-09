import fs from "fs";
import mammoth from "mammoth";

async function buildDataset() {
  const files = fs.readdirSync("./test-files");
  const jsonLinesObjects = [];

  for (const filename of files) {
    const extracted = await mammoth.extractRawText({
      path: "./test-files/" + filename,
    });
    console.log("extracted.value", extracted.value);
    jsonLinesObjects.push({ text: extracted.value });
  }

  const rows = jsonLinesObjects.map((jlo) => JSON.stringify(jlo));
  console.log("rows", rows);
  fs.writeFileSync("test.jsonl", rows.join("\n"), { flag: "w+" });
}

buildDataset();
