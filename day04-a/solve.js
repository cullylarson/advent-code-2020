const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, curry, report, filter, map, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const isValid = curry((requiredFields, passport) => {
    return requiredFields.reduce((acc, fieldName) => {
        return !acc
            // already found a missing field, don't need to continue checking
            ? acc
            : Boolean(passport[fieldName])
    }, true)
})

const lineToRecord = compose(
    Object.fromEntries,
    map(split(':')),
    split(' '),
)

const groupByEmptyLine = str => {
    // eslint-disable-next-line prefer-const
    let lines = []
    let line = ''

    for(let i = 0; i < str.length; i++) {
        const char = str[i]
        const nextChar = i === str.length - 1 ? null : str[i + 1]

        // found a blank line, which means a new record
        if(char === '\n' && nextChar === '\n') {
            lines.push(line.trim())
            line = ''
            i++
        }
        // we don't want newlines in the output, but we're still on the same record, so
        // include a space so we can split later
        else if(char === '\n') {
            line += ' '
        }
        else {
            line += char
        }
    }

    lines.push(line.trim())

    return lines
}

const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
]

compose(
    then(report),
    then(xs => xs.length),
    then(filter(isValid(requiredFields))),
    then(map(lineToRecord)),
    then(groupByEmptyLine),
    x => readFile(x, {encoding: 'utf8'}),
)('input.txt')
