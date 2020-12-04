const {validateHeight} = require('../lib')

test('Valid height.', () => {
    expect(validateHeight('60in')).toBe(true)
    expect(validateHeight('190cm')).toBe(true)
})

test('Invalid height.', () => {
    expect(validateHeight('190in')).toBe(false)
    expect(validateHeight('58in')).toBe(false)
    expect(validateHeight('149cm')).toBe(false)
    expect(validateHeight('194cm')).toBe(false)
    expect(validateHeight('200')).toBe(false)
})
