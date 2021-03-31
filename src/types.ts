declare global {
    interface Window {
        formNode: HTMLDivElement
    }
}

export type Song = {
    id: number
    name: string
    playing?: boolean
    score?: number
}

export type Result = {
    pairing: [number, number]
    preferred: number
    improve: string[]
    comments: string
    email: string
    ip: string
}
