const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, report, map, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

compose(
    then(compose(
        report,
        xs => xs.length,
        xs => xs.flat(),
        map(x => Array.from(x)),
        map(x => new Set(x)),
        map(xs => xs.flat()),
        map(map(split(''))),
        map(split('\n')),
        split('\n\n'),
    )),
    x => readFile(x, {encoding: 'utf8'}),
)('input.txt')
