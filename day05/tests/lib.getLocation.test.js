const {getLocation} = require('../lib')

test('Correctly locates rows.', () => {
    expect(getLocation([0, 127], 'FBFBBFF'.split(''))).toBe(44)
    expect(getLocation([0, 127], 'BFFFBBF'.split(''))).toBe(70)
    expect(getLocation([0, 127], 'FFFBBBF'.split(''))).toBe(14)
    expect(getLocation([0, 127], 'BBFFBBF'.split(''))).toBe(102)

    expect(getLocation([0, 127], 'BBBFFBB'.split(''))).toBe(115)
    expect(getLocation([0, 127], 'BBBFFBF'.split(''))).toBe(114)
})

test('Correctly locates columns.', () => {
    expect(getLocation([0, 7], 'RLR'.split(''))).toBe(5)
    expect(getLocation([0, 7], 'RRR'.split(''))).toBe(7)
    expect(getLocation([0, 7], 'RLL'.split(''))).toBe(4)
})
