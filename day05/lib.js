const {compose, split, map, reduce} = require('@cullylarson/f')

const getPartition = (direction, low, high) => {
    const middle = (high - low + 1) / 2

    return direction === 'LOW'
        ? [low, high - middle]
        : [low + middle, high]
}

const getDirectionFromIndicator = indicator => ['F', 'L'].includes(indicator) ? 'LOW' : 'HIGH'

const getLocation = ([low, high], indicators) => {
    // low will equal high, so can return either
    if(!indicators.length) return low

    const indicator = indicators[0]
    const direction = getDirectionFromIndicator(indicator)

    return getLocation(
        getPartition(direction, low, high),
        indicators.slice(1),
    )
}

const max = reduce((acc, x) => acc === null || x > acc ? x : acc, null)

const getIdFromSeat = ({row, col}) => row * 8 + col

const getRowIndicators = xs => xs.slice(0, 7)
const getColIndicators = xs => xs.slice(7)

const getIds = compose(
    map(getIdFromSeat),
    map(xs => ({
        row: getLocation([0, 127], getRowIndicators(xs)),
        col: getLocation([0, 7], getColIndicators(xs)),
    })),
    map(split('')),
)

module.exports = {
    getPartition,
    getDirectionFromIndicator,
    getLocation,
    getIdFromSeat,
    getIds,
    max,
    getRowIndicators,
    getColIndicators,
}
