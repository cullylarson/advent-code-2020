const {validateAllNumbers} = require('../lib')

test('All numbers is valid.', () => {
    expect(validateAllNumbers('34934913')).toBe(true)
    expect(validateAllNumbers('1234567890')).toBe(true)
})

test('Not valid if contains stuff other than numbers.', () => {
    expect(validateAllNumbers(' 34934913')).toBe(false)
    expect(validateAllNumbers('12345a67890')).toBe(false)
    expect(validateAllNumbers('1234567890a')).toBe(false)
    expect(validateAllNumbers('a1234567890')).toBe(false)
})
