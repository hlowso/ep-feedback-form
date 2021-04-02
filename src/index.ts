import {Result, Song} from './types'

import shuffle from './shuffle'
import {parse, clean} from './parse-csv'
// import {rank} from './elo'
import {rank} from './simple-rank'
import songs from './songs.json'

const sort = (a: Song, b: Song) => b.score! - a.score!;

(async () => {
    const raw = await parse('./feedback.csv')
    const data = clean(raw) as Result[]
    // shuffle(data)
    rank(songs, data)
    songs.sort(sort)
    console.table(songs)
})()
