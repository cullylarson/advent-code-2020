const {getPartition} = require('../lib')

test('Gets correct partitions when going LOW.', () => {
    expect(getPartition('LOW', 0, 127)).toEqual([0, 63])
    expect(getPartition('LOW', 32, 63)).toEqual([32, 47])
    expect(getPartition('LOW', 44, 47)).toEqual([44, 45])
    expect(getPartition('LOW', 44, 45)).toEqual([44, 44])
    expect(getPartition('LOW', 4, 7)).toEqual([4, 5])
})

test('Gets correct partitions when going HIGH.', () => {
    expect(getPartition('HIGH', 0, 63)).toEqual([32, 63])
    expect(getPartition('HIGH', 32, 47)).toEqual([40, 47])
    expect(getPartition('HIGH', 40, 47)).toEqual([44, 47])
    expect(getPartition('HIGH', 0, 7)).toEqual([4, 7])
    expect(getPartition('HIGH', 4, 5)).toEqual([5, 5])
})
