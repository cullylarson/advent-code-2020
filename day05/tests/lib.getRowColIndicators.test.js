const {getRowIndicators, getColIndicators} = require('../lib')

test('Gets row location.', () => {
    expect(getRowIndicators('BBBFFBBRLL'.split('')).join('')).toBe('BBBFFBB')
})

test('Gets col location.', () => {
    expect(getColIndicators('BBBFFBBRLL'.split('')).join('')).toBe('RLL')
})
