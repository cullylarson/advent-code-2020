const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, report, filter, map, split, toInt, trim} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const lineToRecord = line => {
    const [left, password] = line.split(':').map(trim)
    const [numbers, policyLetter] = left.split(' ')
    const [min, max] = numbers.split('-').map(toInt(null))

    return {
        password,
        policyLetter,
        min,
        max,
    }
}

const passesPolicy = record => {
    const policyLetterRegex = new RegExp(record.policyLetter, 'g')
    const numOccurences = (record.password.match(policyLetterRegex) || []).length

    return numOccurences >= record.min && numOccurences <= record.max
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
