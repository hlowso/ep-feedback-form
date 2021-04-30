declare global {
    interface Window {
        formNode: HTMLDivElement
        human: () => void
    }
}

export type Song = {
    id: number
    name: string
    playing?: boolean
    score: number
    winRate?: number
    tieRate?: number
    lossRate?: number
    appearances?: number
    weightedScore?: number
}

export type Result = {
    pairing: [number, number]
    preferred: number
    improve?: string[]
    comments?: string
    email?: string
    ip: string
    weight?: number
}
