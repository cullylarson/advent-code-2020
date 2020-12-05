const {max} = require('../lib')

test('Gets the max value.', () => {
    expect(max([1, 2, 3])).toBe(3)
    expect(max([11, 2, -3])).toBe(11)
})
