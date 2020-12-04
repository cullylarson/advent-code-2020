const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, curry, report, filter, map, split, toInt} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')
const {
    validateLength,
    validateRange,
    validateAllNumbers,
    validateHairColor,
    validateHeight,
    validateEyeColor,
} = require('./lib')

// runs an array of validators on a value. if any validator fails, returns false. otherwise true.
const runValidators = (validators, value) => validators.reduce((acc, validator) => {
    return !acc
        // already failed
        ? acc
        : validator(value)
}, true)

const isFalse = x => x === false

const validateObject = curry((validators, obj) => {
    return compose(
        // if any fields are invalid, the whole object is invalid
        xs => xs.length === 0,
        // only get the failures
        filter(isFalse),
        Object.values,
        // run the array of valiators for each key
        map((value, key) => validators[key] ? runValidators(validators[key], value) : true),
    )(obj)
})

const hasRequiredFields = curry((requiredFields, passport) => {
    return requiredFields.reduce((acc, fieldName) => {
        return !acc
            // already found a missing field, don't need to continue checking
            ? acc
            : Boolean(passport[fieldName])
    }, true)
})

// just a better name for a generic function
const fieldsAreValid = validateObject

const lineToRecord = compose(
    xs => ({
        ...xs,
        byr: toInt(null, xs.byr),
        iyr: toInt(null, xs.iyr),
        eyr: toInt(null, xs.eyr),
    }),
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

const fieldValidators = {
    byr: [validateLength(4), validateRange(1920, 2002)],
    iyr: [validateLength(4), validateRange(2010, 2020)],
    eyr: [validateLength(4), validateRange(2020, 2030)],
    hgt: [validateHeight],
    hcl: [validateHairColor],
    ecl: [validateEyeColor],
    pid: [validateLength(9), validateAllNumbers],
}

compose(
    then(report),
    then(xs => xs.length),
    then(filter(fieldsAreValid(fieldValidators))),
    then(filter(hasRequiredFields(requiredFields))),
    then(map(lineToRecord)),
    then(groupByEmptyLine),
    x => readFile(x, {encoding: 'utf8'}),
)('input.txt')
