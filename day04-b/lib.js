const {toInt, isInt} = require('@cullylarson/f')

const validateLength = length => value => {
    if(isInt(value)) value = String(value)

    return value.length === length
}

const validateRange = (min, max) => value => value >= min && value <= max

const validateAllNumbers = value => /^[0-9]*$/.test(value)

const validateHeight = value => {
    if(value.length < 3) return false

    const unit = value.substr(-2)
    const number = toInt(null, value.slice(0, -2))

    if(!['cm', 'in'].includes(unit)) return false

    if(unit === 'cm') {
        if(number < 150 || number > 193) return false
    }
    else {
        if(number < 59 || number > 76) return false
    }

    return true
}

const validateHairColor = value => /^#[0-9a-f]{6}$/.test(value)

const validateEyeColor = value => [
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth',
].includes(value)

module.exports = {
    validateLength,
    validateRange,
    validateAllNumbers,
    validateHairColor,
    validateHeight,
    validateEyeColor,
}
