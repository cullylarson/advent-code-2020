const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, reduce, curry, trim, report, map, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const isValid = (preamble, number) => {
    for(let i = 0; i < preamble.length - 1; i++) {
        // can't add up to our number if it's larger than it
        if(preamble[i] > number) continue

        for(let j = i + 1; j < preamble.length; j++) {
            // can't add up to our number if it's larger than it
            if(preamble[j] > number) continue

            if(preamble[i] + preamble[j] === number) return true
        }
    }

    return false
}

const findInvalidNumber = curry((preambleSize, numbers) => {
    for(let i = preambleSize; i < numbers.length; i++) {
        const preamble = numbers.slice(i - preambleSize)

        if(!isValid(preamble, numbers[i])) {
            return numbers[i]
        }
    }

    return null
})

const findValuesMinMaxSeriesSummingTo = (values, number) => {
    for(let i = 0; i < values.length; i++) {
        let sum = 0
        let min = null
        let max = null

        for(let j = i; j < values.length; j++) {
            const value = values[j]

            if(min === null || value < min) min = value
            if(max === null || value > max) max = value

            sum += values[j]

            if(sum === number) return [min, max]

            if(sum > number) break
        }
    }

    return null
}

const sum = reduce((acc, x) => acc + x, 0)

then(compose(
    report,
    sum,
    xs => {
        const invalidNumber = findInvalidNumber(25, xs)

        return invalidNumber === null
            ? null
            : findValuesMinMaxSeriesSummingTo(xs, invalidNumber)
    },
    map(Number),
    split('\n'),
    trim,
), readFile('input.txt', {encoding: 'utf8'}))
