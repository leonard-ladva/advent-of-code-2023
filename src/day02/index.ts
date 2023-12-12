import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');
type GameResult = {[key:string]:number};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const colors = new RegExp(/(\d+) (\w+)/g);
  const gameId = new RegExp(/Game (\d+)/);
  
  return input.map((value) => {
	let result: GameResult = {
		id: 0,
		red: 0,
		green: 0,
		blue: 0,
	}
	let id = value.match(gameId);
	result.id = parseInt(id ? id[1] : 'NaN');
	const matches = value.matchAll(colors)
	for (let value of matches) {
		const color = value[2];
		const amount = value[1];
		
		result[color] = parseInt(amount)
		if (result.red > 12 || result.green > 13 || result.blue > 14) {
			return 0;
		}
	}

	return result.id;
  })
  .reduce((previous, current) => previous + current);};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const colors = new RegExp(/(\d+) (\w+)/g);
  
  return input.map((value) => {
	let result: GameResult = {
		red: 0,
		green: 0,
		blue: 0,
	}

	const matches = value.matchAll(colors)
	for (let value of matches) {
		const color = value[2];
		const amount = parseInt(value[1]);

		if (amount > result[color]) {
			result[color] = amount; 
		}
	}
	return result.red * result.green * result.blue;
  })
  .reduce((previous, current) => previous + current);
  return;
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
