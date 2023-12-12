import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  const firstDigit = new RegExp(/\D*(?<first>\d)/)
  const lastDigit = new RegExp(/(?<last>\d)\D*$/)
  
  return input
  .map((value) => {
  	const matchFirst = value.match(firstDigit);
  	const matchLast = value.match(lastDigit);
    return `${matchFirst? matchFirst[1] : 0}${matchLast? matchLast[1] : 0}`;
  })
  .map((value) => parseInt(value))
  .reduce((previous, current) => previous + current);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const digits = new RegExp(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)
  const numbers = new Map([
	['one', '1'],
	['two', '2'],
	['three', '3'],
	['four', '4'],
	['five', '5'],
	['six', '6'],
	['seven', '7'],
	['eight', '8'],
	['nine', '9'],
  ])
  
  return input
  .map((value) => {
  	const matches = Array.from(value.matchAll(digits), x => x[1]);
	const firstMatch = matches.shift();
	const firstDigit = numbers.get(firstMatch ?? 'NaN') ?? firstMatch;
	var lastDigit = firstDigit;
	if (matches.length > 0) {
		const lastMatch = matches.pop();
		lastDigit = numbers.get(lastMatch?? 'NaN') ?? lastMatch;
	}
    return `${firstDigit}${lastDigit}`;
  })
  .map((value) => parseInt(value))
  .reduce((previous, current) => previous + current);
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
