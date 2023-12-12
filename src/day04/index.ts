import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const winningRegex = /(?<=:.+)\d+(?=.+\|)/g
  const myRegex = /(?<=\|.+)\d+/g
  return input.map((value) => {
	const winNums = value.match(winningRegex);
	const myNums = value.match(myRegex);

	if (winNums == null || myNums == null) return 0;

	let wins = 0;
	for (let num of myNums) {
		if (winNums.includes(num)) {
			wins += 1;
		}
	}
	return wins;
  }).map((value) => value == 0 ? 0 : 2 ** (value - 1))
  .reduce((prev, value) => prev + value)
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const winningRegex = /(?<=:.+)\d+(?=.+\|)/g
  const myRegex = /(?<=\|.+)\d+/g

  let instances: number[] = [];
  for (let [currentIndex, value] of input.entries()) {
	const winNums = value.match(winningRegex);
	const myNums = value.match(myRegex);

	if (winNums == null || myNums == null) return 0;

	let wins = 0;
	for (let num of myNums) {
		if (winNums.includes(num)) {
			wins += 1;
		}
	}

	if (instances[currentIndex] == undefined) {
		instances[currentIndex] = 1;
	}	

	for (let i = currentIndex + 1; i < currentIndex + 1 + wins; i++) {
		if (instances[i] == undefined) {
			instances[i] = 1;
		}
		instances[i] += instances[currentIndex] ?? 0;
	}
  }

  return instances
  .reduce((prev, value) => prev + value)
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
