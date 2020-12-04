const {validateHairColor} = require('../lib')

test('Hair color valid.', () => {
    expect(validateHairColor('#1a39bc')).toBe(true)
    expect(validateHairColor('#123456')).toBe(true)
    expect(validateHairColor('#abcdef')).toBe(true)
})

test('Hair color not valid.', () => {
    expect(validateHairColor('a1a39bc')).toBe(false)
    expect(validateHairColor('#1A39bc')).toBe(false)
    expect(validateHairColor('#1a39b')).toBe(false)
    expect(validateHairColor('#1a39bcc')).toBe(false)
})
