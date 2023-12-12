import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const times = input.shift()?.match(/\d+/g)?.map(value => parseInt(value)) ?? [];
  const distances = input.shift()?.match(/\d+/g)?.map(value => parseInt(value)) ?? [];

  var results = times.map(function(time, index) {
	return [time, distances[index]];
  });

  return results.map(([t, d]) => {
	var poss = 0;
	var biggerMedian = Math.floor((t+1)/2);
	for (let num = biggerMedian; num < t; num++) {
		if ((num * (t - num)) > d) {
			poss += 2;
		} 
	}
	if ((t)%2 == 0) {
		poss -=1;
	}

	return poss
  }).reduce((value, prev) => value*prev);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const time = parseInt(input.shift()?.match(/\d+/g)?.reduce((prev, value) => `${prev}${value}`) ?? 'NaN');
  const distance = parseInt(input.shift()?.match(/\d+/g)?.reduce((prev, value) => `${prev}${value}`) ?? 'NaN');

	var poss = 0;
	var biggerMedian = Math.floor((time+1)/2);
	for (let num = biggerMedian; num < time; num++) {
		if ((num * (time - num)) > distance) {
			poss += 2;
		} 
	}
	if ((time)%2 == 0) {
		poss -=1;
	}

	return poss
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
