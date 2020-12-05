const {getIds} = require('../lib')

test('Gets ids from a list of locations.', () => {
    expect(getIds([
        'FBFBBFFRLR',
        'BFFFBBFRRR',
        'FFFBBBFRRR',
        'BBFFBBFRLL',
    ])).toEqual([
        357,
        567,
        119,
        820,
    ])
})
