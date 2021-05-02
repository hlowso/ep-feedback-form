import {Result} from '../types'
import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {scoreB, weight} from '../simple-rank'

const results: Result[] = [
    {pairing: [0,1], preferred: 1, ip: 'foobar', weight: 1},
    {pairing: [1,2], preferred: 1, ip: 'foobar', weight: 1},
    {pairing: [1,2], preferred: 2, ip: 'yamin', weight: 0.5},
    {pairing: [5,6], preferred: 5, ip: '495064', weight: 1},
    {pairing: [1,6], preferred: -1, ip: 'foo', weight: 0.75},
    {pairing: [4,6], preferred: 4, ip: 'foo', weight: 1},
    {pairing: [2,6], preferred: 6, ip: 'foo', weight: 1}
]

test('scoreB()', () => {
    assert.equal(scoreB(1, results), {
        score: 62.5,
        winRate: 50,
        tieRate: 25,
        lossRate: 25,
        appearances: 4,
        weightedScore: 73.1
    })
})

test('weight()', () => {
    weight(results, 2)
    assert.equal(results, [
        {...results[0], weight: 1},
        {...results[1], weight: 1},
        {...results[2], weight: 1},
        {...results[3], weight: 1},
        {...results[4], weight: 2 / 3},
        {...results[5], weight: 2 / 3},
        {...results[6], weight: 2 / 3}
    ])
})

test.run()