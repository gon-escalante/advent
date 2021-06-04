const processByLine = require('./utils/betterProcessByLine');

const decodePass = pass => {
  const row = parseInt(pass.slice(0, 7).replace(/F/g, '0').replace(/B/g,'1'), 2);
  const column = parseInt(pass.slice(7, 10).replace(/L/g, '0').replace(/R/g, '1'), 2);
  const seatId = (row * 8) + column;
  return { row, column, seatId };
}

const findMaxPassId = async () => {
  let max = 0;
  await processByLine('./day5.input', line => {
    const { seatId } = decodePass(line);
    if (seatId > max) max = seatId;
  })

  console.log('Max Id: ', max);
}

// findMaxPassId();


// part two

const findMissingId = async () => {
  const passes = []
  let previous = 0;
  await processByLine('./day5.input', line => passes.push(decodePass(line)))
  const sortedPasses = passes.sort((a,b) => a.seatId - b.seatId)
  sortedPasses.forEach((current, index) => {
    const next = sortedPasses[index + 1];
    if(previous !== 0 && current.seatId - 1 !== previous.seatId && current.seatId + 1 === next?.seatId && current.row !== 0 && current.row !== 127) {
      console.log('My SeatId: ', current.seatId - 1);
    }
    previous = current;
  });
}
findMissingId();
