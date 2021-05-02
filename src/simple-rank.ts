import {Song, Result} from './types'

export const MAX_WEIGHT = 4

export const rank = (songs: Song[], data: Result[]) => {
    weight(data)
    for (const [idx, song] of songs.entries())
        Object.assign(songs[idx], scoreB(song.id, data)) 
}

const round = (num: number) => Math.round((num + Number.EPSILON) * 1000) / 10

const scoreA = (songId: number, data: Result[]) => {
    const counts = data.reduce((c, result) => {
        if (result.pairing.includes(songId))
            c.denominator ++
        if (result.preferred === songId)
            c.numerator ++
        return c
    }, {numerator: 0, denominator: 0})
    return round(counts.numerator / counts.denominator)
}

export const scoreB = (songId: number, data: Result[]) => {
    const stats = data.reduce((f, result) => {
        if (result.pairing.includes(songId)) {
            switch (result.preferred) {
                case songId: {f.wins ++; f.wWins += result.weight!; break}
                case -1: {f.ties ++; f.wTies += result.weight!; break}
            }
            f.appearances ++
            f.wAppearances += result.weight!
        }
        return f
    }, {wins: 0, ties: 0, appearances: 0, wWins: 0, wTies: 0, wAppearances: 0})
    return {
        score: round((2 * stats.wins + stats.ties) / (2 * stats.appearances)),
        winRate: round(stats.wins / stats.appearances),
        tieRate: round(stats.ties / stats.appearances),
        lossRate: round(1 - (stats.wins + stats.ties) / stats.appearances),
        weightedScore: round((2 * stats.wWins + stats.wTies) / (2 * stats.wAppearances)),
        appearances: stats.appearances
    }
}

export const weight = (data: Result[], maxWeight = MAX_WEIGHT) => {
    const byIp = data.reduce((people, result) => {
        !people[result.ip]
            ? people[result.ip] = [result]
            : people[result.ip].push(result)
        return people
    },{} as {[ip:string]: Result[]})
    
    Object.values(byIp).forEach((results) => {
        results.forEach(result => {
            result.weight =
                results.length < maxWeight
                    ? 1
                    : maxWeight / results.length
        })
    })
}
