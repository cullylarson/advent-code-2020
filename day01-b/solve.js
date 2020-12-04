const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, report, filter, map, curry, split, toInt} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const findSumTo = curry((sumTo, xs) => {
    for(let i = 0; i < xs.length - 2; i++) {
        for(let j = i + 1; j < xs.length - 1; j++) {
            for(let k = j + 1; k < xs.length; k++) {
                if(xs[i] + xs[j] + xs[k] === sumTo) {
                    return [xs[i], xs[j], xs[k]]
                }
            }
        }
    }

    return null
})

const multiply = ([a, b, c]) => a * b * c

compose(
    then(report),
    then(multiply),
    then(findSumTo(2020)),
    then(filter(Boolean)),
    then(map(toInt(null))),
    then(split('\n')),
    x => readFile(x, {encoding: 'utf8'}),
)('input.txt')
