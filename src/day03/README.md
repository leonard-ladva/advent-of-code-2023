# 🎄 Advent of Code 2023 - day 3 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/3)

## Notes
**Part 1**: 01:15:35 --> **Part 2**: 00:38:09
* First part was logically quite easy, took a while to implement it and also messed up some start & end boundry of surrounding tiles. 
* I figured out how to do the second one in a couple of minutes. I got stuck comparing a custom object coordinate type, found out the hard way that objects in javascript are compared by reference not values, so I had to stringify the objects to compare them correctly.