import shuffle from "./shuffle"

const equal = <T>(A:T, B:T) => JSON.stringify(A) === JSON.stringify(B)

export const getPairing = (count: number, history: [number, number][]) => {
    const all: [number, number][] = []
    for (let i = 0; i < count; i ++)
        for (let j = 0; j < i; j ++)
            all.push([i, j])
    const fresh = all.filter(a => !history.some(h => equal(a, h)))
    if (fresh.length === 0)
        return null
    shuffle(fresh)
    return fresh[0]
}