import {Song, Result} from './types'

const K = 32
export const E = (Ra: number, Rb: number) => 1 / (1 + Math.pow(10, (Rb-Ra) / 400))
const R = (Ra: number, Sa: number, Ea: number) => Ra + K * (Sa - Ea)
const S = (songId: number, preferred: number) =>
    preferred === -1
        ? 0.5
        : preferred === songId
            ? 1 : 0

export const rank = (songs: Song[], data: Result[]) => {
    for (const result of data) {
        const aIdx = songs.findIndex(s => s.id === result.pairing[0])
        const bIdx = songs.findIndex(s => s.id === result.pairing[1])
        const Ea = E(songs[aIdx].score, songs[bIdx].score)
        const Eb = E(songs[bIdx].score, songs[aIdx].score)
        songs[aIdx].score = R(songs[aIdx].score, S(result.pairing[0], result.preferred), Ea)
        songs[bIdx].score = R(songs[bIdx].score, S(result.pairing[1], result.preferred), Eb)
    }
}