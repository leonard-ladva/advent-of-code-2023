import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

function checkSurrounding(match: RegExpExecArray, rowIndex: number, scheme: string[][]): number {
	const row = scheme[rowIndex];
	const number = match[0];

	let xStart = match.index >= 1 ? match.index - 1 : 0;
	let xEnd = match.index + number.length < row.length ? match.index + number.length : row.length - 1;
	
	let yStart = rowIndex >= 1 ? rowIndex - 1 : 0;
	let yEnd = rowIndex + 1 < scheme.length ? rowIndex + 1 : rowIndex;

	var re = /[^\d.]/;

	// Checking horizontally
	for (let x = xStart; x <= xEnd; x++) {
		if (yStart != rowIndex) {
			if (scheme[yStart][x].match(re) != null) {
				return parseInt(number);
			}
		}
		
		if (yEnd != rowIndex) {
			if (scheme[yEnd][x].match(re) != null) {
				return parseInt(number);
			}
		}
	}
	// Check tile in front and after the word
	if (xStart >= 0) {
		if (scheme[rowIndex][xStart].match(re) != null) {
			return parseInt(number);
		}
	}
	if (xEnd < row.length) {
		if (scheme[rowIndex][xEnd].match(re) != null) {
			return parseInt(number);
		}
	}
return 0;
}

function checkSurroundingGear(match: RegExpExecArray, rowIndex: number, scheme: string[][]): Gear | undefined {
	const row = scheme[rowIndex];
	const number = match[0];

	let xStart = match.index >= 1 ? match.index - 1 : 0;
	let xEnd = match.index + number.length < row.length ? match.index + number.length : row.length - 1;
	
	let yStart = rowIndex >= 1 ? rowIndex - 1 : 0;
	let yEnd = rowIndex + 1 < scheme.length ? rowIndex + 1 : rowIndex;

	var re = /[*]/;

	// Checking horizontally
	for (let x = xStart; x <= xEnd; x++) {
		if (yStart != rowIndex) {
			if (scheme[yStart][x].match(re) != null) {
				return {point: {x: x, y: yStart}, value: parseInt(number)};
			}
		}
		
		if (yEnd != rowIndex) {
			if (scheme[yEnd][x].match(re) != null) {
				return {point: {x: x, y: yEnd}, value: parseInt(number)};
			}
		}
	}
	// Check tile in front and after the word
	if (xStart >= 0) {
		if (scheme[rowIndex][xStart].match(re) != null) {
			return {point: {x: xStart, y: rowIndex}, value: parseInt(number)};
		}
	}
	if (xEnd < row.length) {
		if (scheme[rowIndex][xEnd].match(re) != null) {
			return {point: {x: xEnd, y: rowIndex}, value: parseInt(number)};
		}
	}
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const scheme = input.map((row) => row.split(''))
  let partNumSum = 0;
  // get a number and it's position
  // increase all sides of number by 1
  // check all surrouding squares for symbols except .
  for (let rowIndex = 0; rowIndex < input.length ; rowIndex++) {

	var re = /(\d+)/g;
	var match: RegExpExecArray | null;
	while ((match = re.exec(input[rowIndex])) != null) {
		partNumSum += checkSurrounding(match, rowIndex, scheme);	
	}
  }
  return partNumSum;
};

type Point = {
	x: number,
	y: number,
}

type Gear = {
	point: Point, 
	value: number,
}
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const scheme = input.map((row) => row.split(''))
  let gears: Map<string, number[]> = new Map;

  for (let rowIndex = 0; rowIndex < input.length ; rowIndex++) {

	var re = /(\d+)/g;
	var match: RegExpExecArray | null;
	while ((match = re.exec(input[rowIndex])) != null) {
		const gear = checkSurroundingGear(match, rowIndex, scheme);	
		if (gear == undefined) continue;

		const key = `${gear.point.x},${gear.point.y}`;

		let oldGear = gears.get(key) ?? [];
		oldGear.push(gear.value);
		gears.set(key, oldGear);
	}
  }

  return Array.from(gears.entries())
  .filter(([point, values]) => values.length >= 2)
  .map(([point, values]) => values.reduce((prevNumber, number) => number * prevNumber))
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
