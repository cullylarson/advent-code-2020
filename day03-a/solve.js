const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, curry, report, filter, map, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const solve = curry((right, down, terrain) => {
    const height = terrain.length
    const width = terrain.length ? terrain[0].length : 0

    let trees = 0

    for(let y = 0, x = 0; y < height; y += down, x += right) {
        const xCorrected = x % width

        const tile = terrain[y][xCorrected]

        if(tile === '#') trees++
    }

    return trees
})

compose(
    then(report),
    then(solve(3, 1)),
    then(map(split(''))),
    then(filter(Boolean)),
    then(split('\n')),
    x => readFile(x, {encoding: 'utf8'}),
)('input.txt')
