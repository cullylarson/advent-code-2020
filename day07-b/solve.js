const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, curry, reduce, trim, report, filter, map, split, head, tail} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')

const sum = reduce((acc, x) => acc + x, 0)

const getNumBagsInside = curry((parentName, parentToChildren) => {
    if(parentName === 'no other') return 0

    const children = parentToChildren[parentName]

    return sum(children.map(child => {
        return child.num + child.num * getNumBagsInside(child.name, parentToChildren)
    }))
})

const getBagNameAndNum = bag => {
    if(bag === 'no other') {
        return {
            num: 0,
            name: bag,
        }
    }

    const pieces = bag.split(' ')

    return {
        num: parseInt(pieces[0]),
        name: tail(pieces).join(' '),
    }
}

then(compose(
    report,
    getNumBagsInside('shiny gold'),
    map(map(getBagNameAndNum)),
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
    x => x.replace(/[.]/g, ''),
    // the word bag/s is not helpful
    x => x.replace(/bags?/g, ''),
), readFile('input.txt', {encoding: 'utf8'}))
