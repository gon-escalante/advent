const processByLine = require('./utils/betterProcessByLine');

const processForms = async () => {
  let currentAnswered = {};
  let count = 0;
  await processByLine('./day6.input', line => {
    if(line === '') {
      count += Object.keys(currentAnswered).length;
      currentAnswered = {};
      return;
    }
    for (word of line) {
      currentAnswered[word] = true;
    }
  });
  count += Object.keys(currentAnswered).length;
  console.log('Total positive answered questions: ', count);
}

// processForms();


// part two;

const processForms2 = async () => {
  let currentAnswered = {};
  let count = 0;
  let isFirstOfGroup = true;
  await processByLine('./day6.input', line => {
    if(line === '') {
      isFirstOfGroup = true;
      count += Object.keys(currentAnswered).length;
      currentAnswered = {};
      return;
    }
    if(isFirstOfGroup) {
      for (word of line) {
        currentAnswered[word] = true;
      }
    } else {
      for(question in currentAnswered) {
        if (!line.includes(question)) {
          delete currentAnswered[question];
        }
      }
    }
    isFirstOfGroup = false;
  });
  count += Object.keys(currentAnswered).length;
  console.log('Total positive answered questions by all members of the group: ', count);
}

processForms2();