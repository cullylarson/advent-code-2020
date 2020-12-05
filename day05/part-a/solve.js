const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const {compose, report, filter, split} = require('@cullylarson/f')
const {then} = require('@cullylarson/p')
const {max, getIds} = require('../lib')

compose(
    then(report),
    then(max),
    then(getIds),
    then(filter(Boolean)),
    then(split('\n')),
    x => readFile(x, {encoding: 'utf8'}),
)('../input.txt')
