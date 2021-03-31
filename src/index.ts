import {Result, Song} from './types'

import shuffle from './client/shuffle'
import {parse, clean} from './parse-csv'
import {E, R} from './rating'
import songs from './songs.json'

const S = (songId: number, preferred: number) => {
    if (preferred === -1)
        return 0.5
    return preferred === songId
        ? 1 : 0 
}

const sort = (a: Song, b: Song) => b.score! - a.score!

const rank = (data: Result[]) => {
    for (const result of data) {
        const aIdx = songs.findIndex(s => s.id === result.pairing[0])
        const bIdx = songs.findIndex(s => s.id === result.pairing[1])
        const Ea = E(songs[aIdx].score, songs[bIdx].score)
        const Eb = E(songs[bIdx].score, songs[aIdx].score)
        songs[aIdx].score = R(songs[aIdx].score, S(result.pairing[0], result.preferred), Ea)
        songs[bIdx].score = R(songs[bIdx].score, S(result.pairing[1], result.preferred), Eb)
    }
    songs.sort(sort)
}

(async () => {
    const raw = await parse('./feedback.csv')
    const data = clean(raw) as Result[]
    // shuffle(data)
    rank(data)
    console.table(songs)
})()
