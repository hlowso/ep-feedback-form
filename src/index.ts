import {Result, Song} from './types'

import shuffle from './shuffle'
import {parse} from './parse-csv'
// import {rank} from './elo'
import {rank} from './simple-rank'
import songs from './songs.json'

const sort = (a: Song, b: Song) => b.score! - a.score!;

(async () => {
    const data = await parse('./feedback.csv') as Result[]
    // shuffle(data)
    rank(songs, data)
    songs.sort(sort)
    console.table(songs)
})();

(async () => {
    const data: string[] = await parse('./feedback.csv')
    const allIps = data.map(result => result[2])
    const people = allIps.reduce((people, ip) => {
        !people[ip]
            ? (people[ip] = 1)
            : people[ip]++
        return people
    }, {} as {[ip:string]: number})
    console.log(Object.keys(people).length - 1 + people[''], 'people')
    console.log(allIps.length, 'submissions')
})()
