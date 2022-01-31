const fs = require('fs');

let input = fs.readFileSync('puzzleinput.txt', 'utf-8').split(',');
input = input.map(str => Number(str));

const currFish = [0,0,0,0,0,0,0,0,0];

input.forEach(fish => {
  currFish[fish] += 1
});

function waitNDays(numDays) {
  for (let i = 0; i < numDays; i++) {
    const newFish = currFish.shift();
    currFish.push(newFish);
    currFish[6] += newFish;
  }
  const reducer = (prev, curr) => prev + curr;
  return currFish.reduce(reducer);
}

console.log(waitNDays(256));