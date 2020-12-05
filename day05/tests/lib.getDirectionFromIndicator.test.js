const {getDirectionFromIndicator} = require('../lib')

test('Gets LOW when passed F.', () => {
    expect(getDirectionFromIndicator('F')).toBe('LOW')
})

test('Gets LOW when passed L.', () => {
    expect(getDirectionFromIndicator('L')).toBe('LOW')
})

test('Gets HIGH when passed B.', () => {
    expect(getDirectionFromIndicator('B')).toBe('HIGH')
})

test('Gets HIGH when passed R.', () => {
    expect(getDirectionFromIndicator('R')).toBe('HIGH')
})
