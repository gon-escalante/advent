const fs = require('fs');
const readline = require('readline');

async function processLineByLine(path, fn) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path)
  });
  for await (const line of rl) {
    fn(line);
  }
}

module.exports = processLineByLine;