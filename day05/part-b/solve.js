const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, curry, report, filter, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')
const {getIds, getIdFromSeat} = require('../lib')

const findMissing = curry(([rowLow, rowHigh], [colLow, colHigh], ids) => {
    const found = ids.reduce((acc, id) => {
        acc[id] = true
        return acc
    }, {})

    for(let row = rowLow; row <= rowHigh; row++) {
        for(let col = colLow; col <= colHigh; col++) {
            const def = {row, col}
            const id = getIdFromSeat(def)

            // our seat is missing, but has seats on either side
            if(!found[id] && found[id + 1] && found[id - 1]) {
                return id
            }
        }
    }
})

compose(
    then(report),
    then(findMissing([0, 127], [0, 7])),
    then(getIds),
    then(filter(Boolean)),
    then(split('\n')),
    x => readFile(x, {encoding: 'utf8'}),
)('../input.txt')
