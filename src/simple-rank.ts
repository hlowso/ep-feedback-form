import {Song, Result} from './types'

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

const scoreB = (songId: number, data: Result[]) => {
    const fraction = data.reduce((f, result) => {
        if (result.pairing.includes(songId)) {
            switch (result.preferred) {
                case songId:
                    f.num += 2
                    break
                case -1:
                    f.num ++
                    break
            }
            f.den += 2
        }
        return f
    }, {num: 0, den: 0})
    return round(fraction.num / fraction.den)
}

export const rank = (songs: Song[], data: Result[]) => {
    for (const [idx, song] of songs.entries())
        songs[idx].score = scoreB(song.id, data) 
}