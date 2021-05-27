const processByLine = require('./utils/processByLine');
const regex = /(?<min>[0-9]+)-(?<max>[0-9]+) (?<letter>\w): (?<password>\w+)/
const processPasswords = async () => {
  const inputArray = await processByLine('./day2.input');
  let correctCount = 0;
  let correctCountPartTwo = 0;
  for (input of inputArray) {
    const { min, max, letter, password } = input.match(regex).groups;
    const ocurrences = password.split(letter).length - 1;
    if (ocurrences >= parseInt(min) && ocurrences <= parseInt(max)) {
      correctCount++;
    }
    
    // Part two
    const position1 = parseInt(min) - 1;
    const position2 = parseInt(max) - 1;
    if (password[position1] === letter ^ password[position2] === letter) {
      correctCountPartTwo++;
    }
  }
  console.log('Part one correct passwords: ', correctCount);
  console.log('Part two correct passwords: ', correctCountPartTwo);
}

processPasswords();