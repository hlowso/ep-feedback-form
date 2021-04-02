import {Song, Result} from './types'

const score = (songId: number, data: Result[]) => {
    const counts = data.reduce((c, result) => {
        if (result.pairing.includes(songId))
            c.denominator ++
        if (result.preferred === songId)
            c.numerator ++
        return c
    }, {numerator: 0, denominator: 0})
    return counts.numerator / counts.denominator
}


export const rank = (songs: Song[], data: Result[]) => {
    for (const [idx, song] of songs.entries())
        songs[idx].score = score(song.id, data) 
}