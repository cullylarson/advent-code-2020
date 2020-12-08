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

const runProgramToLoopOrEnd = instructions => {
    let acc = 0
    const hasRun = {}

    for(let i = 0; i < instructions.length;) {
        if(hasRun[i]) return null

        hasRun[i] = true

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

// NOTE: this won't work if the program runs without looping, without being modified, because
// this function will try changing instructions right away, without running the programm
// unmodified.
const modifyUntilRuns = instructions => {
    for(let i = 0; i < instructions.length;) {
        const instruction = instructions[i]

        // if the instruction is one we want to change, then try changing it
        if(['nop', 'jmp'].includes(instruction.operation)) {
            const oldInstruction = instruction

            instructions[i] = {
                ...instruction,
                // swap the instruction
                operation: instruction.operation === 'nop' ? 'jmp' : 'nop',
            }

            // try the program with the changed instruction
            const result = runProgramToLoopOrEnd(instructions)
            if(result !== null) return result

            // revert the changed instruction
            instructions[i] = oldInstruction
        }

        i++

        // since we won't change instructions other than nop and jmp, just skip any other instructions
        while(!['nop', 'jmp'].includes(instructions[i].operation) && i < instructions.length) {
            i++
        }
    }
}

then(compose(
    report,
    modifyUntilRuns,
    map(parseInstruction),
    filter(Boolean),
    split('\n'),
), readFile('input.txt', {encoding: 'utf8'}))
