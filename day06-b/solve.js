const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, report, filter, map, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const intersect = xs => xs.reduce((a, b) => a.filter(c => b.includes(c)))

compose(
    then(compose(
        report,
        xs => xs.length,
        xs => xs.flat(),
        filter(xs => xs.length),
        map(intersect),
        map(map(split(''))),
        map(filter(Boolean)),
        map(split('\n')),
        split('\n\n'),
    )),
    x => readFile(x, {encoding: 'utf8'}),
)('input.txt')
