# dataset-script-test

1. initialize node project with `npm init -y`
1. create entry file `dataset-transform.js`
1. add `"type": "module"` to the **package.json** file
1. create `test-files` and `train-files` folders and copy `.docx` files in an appropriate split (80-90% train, 10-20% test)
1. create `.gitignore` file and add **node_modules** to it
1. install mammoth using `npm install mammoth`
1. open `dataset-transform.js` and begin coding

### writing the code

- import node's **fs** library usign `import fs from 'fs'`
- get a list of the files using `fs.readdirSync("./test-files")`
- create an async function to run your code, because we will need to `await` promises
- inside the async function, iterate through the file names and extract text using `mammoth`

```
  for (const filename of files) {
    const extracted = await mammoth.extractRawText({
      path: "./test-files/" + filename,
    });
```

- create a variable to hold all the extracted texts `const jsonLinesObjects = [];`
- using a map function, turn your objects into strings `const rows = jsonLinesObjects.map((jlo) => JSON.stringify(jlo));`
- create a file to hold all the strings `fs.writeFileSync("test.jsonl", rows.join("\n"), { flag: "w+" });`.
  We join each row with a newline character, and use the "w+" flag to create the file if it doesn't exists. "w+" will also cause the file contents to be overwritten each time we run the script.
- to run your code, open a terminal in the project folder and type `node dataset-transform.js`

### next stepts

1. alter the contents of the strings extracted from the docx files (extracted.value) and insert the necessary
   tags, such as `<s>`
1. alter the async function to be reusable, and call it twice, one for each set (test and train)
