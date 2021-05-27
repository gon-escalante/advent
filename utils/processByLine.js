const fs = require('fs');
const readline = require('readline');

async function processLineByLine(path) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path)
  });
  const inputArray = [];
  for await (const line of rl) {
    inputArray.push(line)
  }
  return inputArray;
}

module.exports = processLineByLine;