declare global {
    interface Window {
        formNode: HTMLDivElement
    }
}

export type Song = {
    id: number
    name: string
    playing?: boolean
}

