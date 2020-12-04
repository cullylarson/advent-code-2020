const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, report, filter, map, split, toInt, trim} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const lineToRecord = line => {
    const [left, password] = line.split(':').map(trim)
    const [numbers, policyLetter] = left.split(' ')
    const positions = numbers.split('-').map(toInt(null))

    return {
        password,
        policyLetter,
        positions,
    }
}

const passesPolicy = record => {
    const indexes = record.positions.map(x => x - 1)

    // only one location matches
    return indexes.filter(i => record.password[i] === record.policyLetter).length === 1
}

compose(
    then(report),
    then(xs => xs.length),
    then(filter(passesPolicy)),
    then(map(lineToRecord)),
    then(filter(Boolean)),
    then(split('\n')),
    x => readFile(x, {encoding: 'utf8'}),
)('input.txt')
