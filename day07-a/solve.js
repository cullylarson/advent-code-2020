const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, curry, reduce, trim, report, filter, map, split, head, tail} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const getParents = curry((child, parentToChildren) => {
    return Object.keys(filter((children) => {
        return children.includes(child)
    }, parentToChildren))
})

const getAncestors = curry((child, parentToChildren) => {
    const parents = getParents(child, parentToChildren)

    return Array.from(new Set([
        ...parents,
        ...parents.map(x => getAncestors(x, parentToChildren)).flat(),
    ]))
})

then(compose(
    report,
    xs => xs.length,
    getAncestors('shiny gold'),
    reduce((acc, xs) => {
        const parent = head(xs)
        const children = tail(xs)

        acc[parent] = children
        return acc
    }, {}),
    map(map(trim)),
    map(xs => ([
        // this separates the parent from the children, so the parent will be the first item in the resultant array
        ...head(xs).split(' contain '),
        ...tail(xs),
    ])),
    // the comma indicates a bag can contain more than one bag, so splitting gives us a list of those bags
    map(split(',')),
    filter(Boolean),
    split('\n'),
    // numbers are not helpful
    x => x.replace(/[0-9.]/g, ''),
    // the word bag/s is not helpful
    x => x.replace(/bags?/g, ''),
), readFile('input.txt', {encoding: 'utf8'}))
