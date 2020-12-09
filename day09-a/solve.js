const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, curry, trim, report, map, split} = require('@cullylarson/f')
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

then(compose(
    report,
    findInvalidNumber(25),
    map(Number),
    split('\n'),
    trim,
), readFile('input.txt', {encoding: 'utf8'}))
