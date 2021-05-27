const processLineByLine = require('./utils/processByLine');

processLineByLine('./day1.input').then(inputArray => {
  const parsedInputArray = inputArray.map(input => parseInt(input))
  let aux1, aux2;

  for(i = 0; i < parsedInputArray.length; i ++) {
    aux1 = parsedInputArray[i];
    for(j = i + 1; j < parsedInputArray.length; j ++) {
      aux2 = parsedInputArray[j];
      if(aux1 + aux2 === 2020) {
        console.log('These:', aux1, aux2);
        console.log('Result', aux1 * aux2);
        return;
      }
    }
  }
});

// Part two

processLineByLine('./day1.input').then(inputArray => {
  const parsedInputArray = inputArray.map(input => parseInt(input))
  let aux1, aux2, aux3;
  for(i = 0; i < parsedInputArray.length; i ++) {
    aux1 = parsedInputArray[i];
    for(j = i + 1; j < parsedInputArray.length; j ++) {
      aux2 = parsedInputArray[j];
      for(k = j + 1; k < parsedInputArray.length; k ++) {
        aux3 = parsedInputArray[k];
        if(aux1 + aux2 + aux3 === 2020) {
          console.log('These:', aux1, aux2, aux3);
          console.log('Result', aux1 * aux2 * aux3);
          return;
        }

      }
    }
  }
})