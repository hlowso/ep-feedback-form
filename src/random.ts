import {Song} from './types'
import shuffle from "./shuffle"

const equal = (A:[number, number], B:[number, number]) => A[0] === B[0] && A[1] === B[1]

export const getPairing = (songs: Song[], history: [number, number][]) => {
    const all: [number, number][] = []
    for (let i = 0; i < songs.length; i ++)
        for (let j = 0; j < i; j ++)
            all.push([songs[i].id, songs[j].id])
    const fresh = all.filter(a => !history.some(h => equal(a, h)))
    if (fresh.length === 0)
        return null
    shuffle(fresh)
    return fresh[0]
}