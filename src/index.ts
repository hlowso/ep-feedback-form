import {Song} from './types'

import {parse} from './parse-csv'
import {rank, MAX_WEIGHT} from './simple-rank'
import songs from './songs.json'

const sort = (a: Song, b: Song) => b.weightedScore! - a.weightedScore!;

(async () => {
    const data = await parse('./data.csv')
    rank(songs, data)
    songs.sort(sort)
    console.table(songs)
    console.log('Max weight', MAX_WEIGHT)
})();

(async () => {
    const allIps = (await parse('./data.csv')).map(({ip}) => ip)
    const people = allIps.reduce((people, ip) => {
        !people[ip]
            ? (people[ip] = 1)
            : people[ip]++
        return people
    }, {} as {[ip:string]: number})
    console.log('People', Object.keys(people).length)
    console.log('Submissions', allIps.length)
})();
