# 🎄 Advent of Code 2023 - day 1 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/1)

## Notes
* Honestly probably took over 2 hours, mostly because I was trying to use regex in a stupid way. I tried to get the first and last digit using lookaheads/behinds, when I could've just gotten all the matches right away and take the first and last out of the array.
* Had to remember regex overall as well
* In the second part I didn't consider overlapping groups, which wasn't an issue with the sample data, but got me stuck for a while. The answer was to use a zero-width assertion (a positive lookahead with a capturing group) to test all positions inside the input string. From [this fine stackoverflow question](https://stackoverflow.com/questions/20833295/how-can-i-match-overlapping-strings-with-regex)
