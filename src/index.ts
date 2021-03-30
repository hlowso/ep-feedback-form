import {parse, clean} from './parse-csv'
import {E, R} from './rating'

const S = (songs: [number, number], preferred: number, idx: number) => {
    if (preferred === -1)
        return 0.5
    return preferred === songs[idx]
        ? 1 : 0 
}

(async () => {
    const raw = await parse('./feedback.csv')
    const data = clean(raw)
    for (const result of data)
        console.log(result)
})()
