const processLineByLine = require('./utils/processByLine');

const processSlide = async () => {
  const inputArray = await processLineByLine('./day3.input');
  let current = 0;
  let count = 0;
  for(line of inputArray) {
    if(line[current] === '#') {
      count++;
    }
    current = (current + 3) % line.length;
  }
  console.log('part one solution: ', count);
}
processSlide();


// part two
const slopes = [{ right: 3, down: 1 }, { right: 1, down: 1 }, { right: 5, down: 1 }, { right: 7, down: 1 }, { right: 1, down: 2 }];
const processSlides = async () => {
  const inputArray = await processLineByLine('./day3.input');
  const solutions = [];
  for({ right, down } of slopes) {
    let count = 0;
    let current = 0;
    for(let i = 0; i < inputArray.length; i = i + down) {
      if(inputArray[i][current] === '#') {
        count++;
      }
      current = (current + right) % inputArray[i].length;
    }
    solutions.push(count);
  }
  console.log('part two solution: ', solutions.reduce((result, solution) => result * solution, 1));
}

processSlides();