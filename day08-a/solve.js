const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, report, filter, map, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const parseInstruction = instructionStr => {
    const [, operation, argument] = /([a-z]{3}) ([+-][0-9]+)/.exec(instructionStr)

    return {
        operation,
        argument: parseInt(argument),
    }
}

const runProgramToLoop = instructions => {
    let acc = 0

    for(let i = 0; i < instructions.length;) {
        if(instructions[i].hasRun) return acc

        instructions[i].hasRun = true

        const instruction = instructions[i]

        switch(instruction.operation) {
            case 'acc':
                acc += instruction.argument
                break
            case 'jmp':
                i += instruction.argument
                // if we don't continue, `i` will be incremented
                continue
        }

        i++
    }

    return acc
}

then(compose(
    report,
    runProgramToLoop,
    map(parseInstruction),
    filter(Boolean),
    split('\n'),
), readFile('input.txt', {encoding: 'utf8'}))
