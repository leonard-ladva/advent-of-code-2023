import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n');
type Range = {
	source: number;
	destination: number;
	length: number;
}
function sourceToDestinationConverter(source: number, ranges: Range[]): number {
	for (let range of ranges) {
		if (source >= range.source && source < range.source + range.length) {
			return range.destination + (source - range.source)
		}
	}
	return source;
}

function inputDataToSeeds(input: string[]): number[] {
	const seedRegex = new RegExp(/\d+/g);
	return input.shift()?.match(seedRegex)?.map((value) => parseInt(value)) ?? [];
}

function inputDataToMaps(input: string[]): Range[][] {
	let ranges: Range[][] = [];
	const rangeRegex = new RegExp(/^((?<dest>\d+) (?<source>\d+) (?<length>\d+))/gm)
	let mapNumber = -1;
	for (let row of input) {
		if (row.match(/map/)) {
			mapNumber += 1;
			ranges.push([]);
			continue;
		}

		if (row.match(rangeRegex) == null) continue
		// @ts-ignore	
		const { groups: { dest, source, length } } = rangeRegex.exec(row);
		ranges[mapNumber].push({
				destination: parseInt(dest), 
				source: parseInt(source), 
				length: parseInt(length)
		})
	}
	return ranges;
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const maps = inputDataToMaps(input);
  const seeds = inputDataToSeeds(input);
  let seedDestinations: number[] = seeds;

for (let rangeMap of maps) {
  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
	seedDestinations[seedIndex] = sourceToDestinationConverter(seeds[seedIndex], rangeMap);
  }
}

  return seedDestinations.reduce((value, previous) => value < previous ? value : previous);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

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
